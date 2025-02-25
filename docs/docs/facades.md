# Facades
[[toc]]

## Introduction

Throughout the Laravel Hyperf documentation, you will see examples of code that interacts with Laravel Hyperf's features via "facades". Facades provide a "static" interface to classes that are available in the application's [service container](/docs/container). Laravel Hyperf ships with many facades which provide access to almost all of Laravel Hyperf's features.

Laravel Hyperf facades serve as "static proxies" to underlying classes in the service container, providing the benefit of a terse, expressive syntax while maintaining more testability and flexibility than traditional static methods. It's perfectly fine if you don't totally understand how facades work - just go with the flow and continue learning about Laravel Hyperf.

All of Laravel Hyperf's facades are defined in the `LaravelHyperf\Support\Facades` namespace. So, we can easily access a facade like so:

```php
use LaravelHyperf\Support\Facades\Cache;
use LaravelHyperf\Support\Facades\Route;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

Throughout the Laravel Hyperf documentation, many of the examples will use facades to demonstrate various features of the framework.

#### Helper Functions

To complement facades, Laravel Hyperf offers a variety of global "helper functions" that make it even easier to interact with common Laravel features. Some of the common helper functions you may interact with are `view`, `response`, `url`, `config`, and more. Each helper function offered by Laravel is documented with their corresponding feature; however, a complete list is available within the dedicated [helper documentation](/docs/helpers).

For example, instead of using the `LaravelHyperf\Support\Facades\Response` facade to generate a JSON response, we may simply use the `response` function. Because helper functions are globally available, you do not need to import any classes in order to use them:

```php
use LaravelHyperf\Support\Facades\Response;

Route::get('/users', function () {
    return Response::json([
        // ...
    ]);
});

Route::get('/users', function () {
    return response()->json([
        // ...
    ]);
});
```

## When to Utilize Facades

Facades have many benefits. They provide a terse, memorable syntax that allows you to use Laravel Hyperf's features without remembering long class names that must be injected or configured manually. Furthermore, because of their unique usage of PHP's dynamic methods, they are easy to test.

However, some care must be taken when using facades. The primary danger of facades is class "scope creep". Since facades are so easy to use and do not require injection, it can be easy to let your classes continue to grow and use many facades in a single class. Using dependency injection, this potential is mitigated by the visual feedback a large constructor gives you that your class is growing too large. So, when using facades, pay special attention to the size of your class so that its scope of responsibility stays narrow. If your class is getting too large, consider splitting it into multiple smaller classes.

### Facades vs. Dependency Injection

One of the primary benefits of dependency injection is the ability to swap implementations of the injected class. This is useful during testing since you can inject a mock or stub and assert that various methods were called on the stub.

Typically, it would not be possible to mock or stub a truly static class method. However, since facades use dynamic methods to proxy method calls to objects resolved from the service container, we actually can test facades just as we would test an injected class instance. For example, given the following route:

```php
use LaravelHyperf\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

Using Laravel Hyperf 's facade testing methods, we can write the following test to verify that the `Cache::get` method was called with the argument we expected:

```php
use LaravelHyperf\Support\Facades\Cache;

/**
 * A basic functional test example.
 */
public function test_basic_example(): void
{
    Cache::shouldReceive('get')
        ->with('key')
        ->andReturn('value');

    $response = $this->get('/cache');

    $response->assertSee('value');
}
```

### Facades vs. Helper Functions

In addition to facades, Laravel Hyperf includes a variety of "helper" functions which can perform common tasks like generating views, firing events, or sending HTTP responses. Many of these helper functions perform the same function as a corresponding facade. For example, this facade call and helper call are equivalent:

```php
return LaravelHyperf\Support\Facades\View::render('profile');

return view('profile');
```

There is absolutely no practical difference between facades and helper functions. When using helper functions, you may still test them exactly as you would the corresponding facade. For example, given the following route:

```php
Route::get('/cache', function () {
    return cache('key');
});
```

The `cache` helper is going to call the `get` method on the class underlying the `Cache` facade. So, even though we are using the helper function, we can write the following test to verify that the method was called with the argument we expected:

```php
use LaravelHyperf\Support\Facades\Cache;

/**
 * A basic functional test example.
 */
public function test_basic_example(): void
{
    Cache::shouldReceive('get')
        ->with('key')
        ->andReturn('value');

    $response = $this->get('/cache');

    $response->assertSee('value');
}
```

## How Facades Work

In a Laravel application, a facade is a class that provides access to an object from the container. The machinery that makes this work is in the `Facade` class. Laravel Hyperf's facades, and any custom facades you create, will extend the base `LaravelHyperf\Support\Facades\Facade` class.

The `Facade` base class makes use of the `__callStatic()` magic-method to defer calls from your facade to an object resolved from the container. In the example below, a call is made to the Laravel Hyperf cache system. By glancing at this code, one might assume that the static `get` method is being called on the `Cache` class:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Psr\Http\Message\ResponseInterface;
use LaravelHyperf\Support\Facades\Cache;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     */
    public function showProfile(string $id): ResponseInterface
    {
        $user = Cache::get('user:'.$id);

        return view('profile', ['user' => $user]);
    }
}
```

Notice that near the top of the file we are "importing" the `Cache` facade. This facade serves as a proxy for accessing the underlying implementation of the `LaravelHyperf\Cache\Contracts\Factory` interface. Any calls we make using the facade will be passed to the underlying instance of Laravel Hyperf's cache service.

If we look at that `LaravelHyperf\Support\Facades\Cache` class, you'll see that there is no static method `get`:

```php
use LaravelHyperf\Cache\Contracts\Factory;

class Cache extends Facade
{
    /**
     * Get the registered name of the component.
     */
    protected static function getFacadeAccessor(): string
    {
        return Factory::class;
    }
}
```

Instead, the `Cache` facade extends the base `Facade` class and defines the method `getFacadeAccessor()`. This method's job is to return the name of a service container binding. When a user references any static method on the `Cache` facade, Laravel Hyperf resolves the `cache` binding from the [service container](/docs/container) and runs the requested method (in this case, `get`) against that object.

## Facade Class Reference

Below you will find every facade and its underlying class. This is a useful tool for quickly digging into the API documentation for a given facade root. The [service container binding](/docs/container) key is also included where applicable.

Facade  |  Class  |  Service Container Binding
------------- | ------------- | -------------
App  |  LaravelHyperf\Foundation\Application  |  `app`
Artisan  |  LaravelHyperf\Foundation\Console\Contracts\Kernel  |  `artisan`
Auth  |  LaravelHyperf\Auth\AuthManager  |  `auth`
Auth (Instance)  |  LaravelHyperf\Auth\Contracts\Guard  |  `auth.driver`
Blade  |  Hyperf\ViewEngine\Compiler\CompilerInterface  |  `blade.compiler`
Broadcast  | LaravelHyperf\Broadcasting\Contracts\Factory |  &nbsp;
Bus  | LaravelHyperf\Bus\Contracts\Dispatcher |  &nbsp;
Cache  |  LaravelHyperf\Cache\CacheManager  |  `cache`
Cache (Instance)  |  LaravelHyperf\Cache\Repository  |  `cache.store`
Config  |  LaravelHyperf\Config\Contracts\Repository  |  `config`
Cookie  |  LaravelHyperf\Cookie\CookieManager  |  `cookie`
Crypt  |  LaravelHyperf\Encryption\Encrypter  |  `encrypter`
DB  |  Hyperf\DbConnection\Db  |  `db`
Event  |  Psr\EventDispatcher\EventDispatcherInterface  |  `events`
Environment  |  LaravelHyperf\Support\Environment  |  &nbsp;
File  |  LaravelHyperf\Filesystem\Filesystem  |  `files`
Gate  |  LaravelHyperf\Auth\Contracts\Gate  |  &nbsp;
Hash  |  LaravelHyperf\Hashing\Contracts\Hasher  |  `hash`
Http  |  LaravelHyperf\HttpClient\Factory  |  &nbsp;
Lang  |  Hyperf\Contract\TranslatorLoaderInterface  |  `translator`
Log  |  Psr\Log\LoggerInterface  |  `log`
Mail  |  LaravelHyperf\Mail\Contracts\Factory  |  `mailer`
Notification  |  LaravelHyperf\Notifications\Contracts\Dispatcher  |  &nbsp;
Queue  |  LaravelHyperf\Queue\Contracts\Factory  |  `queue`
RateLimiter  |  LaravelHyperf\Cache\RateLimiter  |  &nbsp;
Redis  |  Hyperf\Redis\Redis  |  `redis`
Request  |  LaravelHyperf\Http\Contracts\RequestContract  |  `request`
Response  |  LaravelHyperf\Http\Contracts\ResponseContract  |  `response`
Route  |  LaravelHyperf\Router\Router  |  `router`
Schedule  |  LaravelHyperf\Foundation\Console\Contracts\Schedule  |  `schedule`
Schema  |  LaravelHyperf\Database\Schema\SchemaProxy  |  `db.schema`
Session  |  LaravelHyperf\Session\Contracts\Session  |  `session`
Storage  |  LaravelHyperf\Filesystem\Contracts\Factory  |  `filesystem`
URL  |  LaravelHyperf\Router\UrlGenerator  |  `url`
Validator  |  Hyperf\Validation\Contract\ValidatorFactoryInterface  |  `validator`
View  |  Hyperf\View\RenderInterface  |  `view`

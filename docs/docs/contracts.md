# Contracts
[[toc]]

## Introduction

Laravel Hyperf's "contracts" are a set of interfaces that define the core services provided by the framework. For example, an `LaravelHyperf\Auth\Contracts\Gate` contract defines the methods needed for authorizing a resource, while the `LaravelHyperf\Hashing\Contracts\Hasher` contract defines the methods needed for generating a secure hash.

All of the contracts live separately in the `Contracts` directory in their belonging packages. This provides a quick reference point for all available contracts, as well as a single, decoupled package that may be utilized when building packages that interact with Laravel Hyperf services.

### Contracts vs. Facades

Laravel Hyperf's [facades](/docs/facades) and helper functions provide a simple way of utilizing Laravel Hyperf's services without needing to type-hint and resolve contracts out of the service container. In most cases, each facade has an equivalent contract.

Unlike facades, which do not require you to require them in your class' constructor, contracts allow you to define explicit dependencies for your classes. Some developers prefer to explicitly define their dependencies in this way and therefore prefer to use contracts, while other developers enjoy the convenience of facades. **In general, most applications can use facades without issue during development.**

## When to Use Contracts

The decision to use contracts or facades will come down to personal taste and the tastes of your development team. Both contracts and facades can be used to create robust, well-tested Laravel Hyperf applications. Contracts and facades are not mutually exclusive. Some parts of your applications may use facades while others depend on contracts. As long as you are keeping your class' responsibilities focused, you will notice very few practical differences between using contracts and facades.

In general, most applications can use facades without issue during development. If you are building a package that integrates with multiple PHP frameworks you may wish to use the corresponding contracts to define your integration with Laravel Hyperf's services without the need to require Laravel Hyperf's concrete implementations in your package's `composer.json` file.

## How to Use Contracts

So, how do you get an implementation of a contract? It's actually quite simple.

Many types of classes in Laravel Hyperf are resolved through the [service container](/docs/container), including controllers, event listeners, middleware and even route closures. So, to get an implementation of a contract, you can just "type-hint" the interface in the constructor of the class being resolved.

For example, take a look at this event listener:

```php
<?php

namespace App\Listeners;

use App\Events\OrderWasPlaced;
use App\Models\User;
use LaravelHyperf\Cache\Contracts\Factory;

class CacheOrderInformation
{
    /**
     * Create a new event handler instance.
     */
    public function __construct(
        protected Factory $cache,
    ) {}

    /**
     * Handle the event.
     */
    public function handle(OrderWasPlaced $event): void
    {
        // ...
    }
}
```

When the event listener is resolved, the service container will read the type-hints on the constructor of the class, and inject the appropriate value. To learn more about registering things in the service container, check out [its documentation](/docs/container).

<a name="contract-reference"></a>
## Contract Reference

This table provides a quick reference to all of the Laravel Hyperf contracts and their equivalent facades:

| Contract                                                                                                                                               | References Facade         |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| [LaravelHyperf\Auth\Contracts\Authorizable](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/Authorizable.php)                 |  &nbsp;                   |
| [LaravelHyperf\Auth\Contracts\Gate](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/Gate.php)                                 | `Gate`                    |
| [LaravelHyperf\Auth\Contracts\Authenticatable](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/Authenticatable.php)                         |  &nbsp;                   |
| [LaravelHyperf\Auth\Contracts\FactoryContract](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/FactoryContract.php)                                         | `Auth`                    |
| [LaravelHyperf\Auth\Contracts\Guard](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/Guard.php)                                             | `Auth::guard()`         |
| [LaravelHyperf\Auth\Contracts\StatefulGuard](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/StatefulGuard.php)                             | &nbsp;                    |
| [LaravelHyperf\Auth\Contracts\SupportsBasicAuth](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/SupportsBasicAuth.php)                     | &nbsp;                    |
| [LaravelHyperf\Auth\Contracts\UserProvider](https://github.com/laravel-hyperf/components/blob/master/src/auth/src/Contracts/UserProvider.php)                               | &nbsp;                    |
| [LaravelHyperf\Bus\Contracts\Dispatcher](https://github.com/laravel-hyperf/components/blob/master/src/bus/src/Contracts/Dispatcher.php)                               | `Bus`                    |
| [LaravelHyperf\Bus\Contracts\QueuingDispatcher](https://github.com/laravel-hyperf/components/blob/master/src/bus/src/Contracts/QueuingDispatcher.php)                               | `Bus::dispatchToQueue()`        |
| [LaravelHyperf\Broadcasting\Contracts\Factory](https://github.com/laravel-hyperf/components/blob/master/src/broadcasting/src/Contracts/Factory.php)                               | `Broadcast`                  |
| [LaravelHyperf\Broadcasting\Contracts\Broadcaster](https://github.com/laravel-hyperf/components/blob/master/src/broadcasting/src/Contracts/Broadcaster.php)                               | `Broadcast::connection()`           |
| [LaravelHyperf\Broadcasting\Contracts\ShouldBroadcast](https://github.com/laravel-hyperf/components/blob/master/src/broadcasting/src/Contracts/ShouldBroadcast.php)                               | &nbsp;                    |
| [LaravelHyperf\Broadcasting\Contracts\ShouldBroadcastNow](https://github.com/laravel-hyperf/components/blob/master/src/broadcasting/src/Contracts/ShouldBroadcastNow.php)                               | &nbsp;                    |
| [LaravelHyperf\Cache\Contracts\Factory](https://github.com/laravel-hyperf/components/blob/master/src/cache/src/Contracts/Factory.php)                                       | `Cache`                   |
| [LaravelHyperf\Cache\Contracts\Lock](https://github.com/laravel-hyperf/components/blob/master/src/cache/src/Contracts/Lock.php)                                             | &nbsp;                    |
| [LaravelHyperf\Cache\Contracts\LockProvider](https://github.com/laravel-hyperf/components/blob/master/src/cache/src/Contracts/LockProvider.php)                             | &nbsp;                    |
| [LaravelHyperf\Cache\Contracts\Repository](https://github.com/laravel-hyperf/components/blob/master/src/cache/src/Contracts/Repository.php)                                 | `Cache::driver()`         |
| [LaravelHyperf\Cache\Contracts\Store](https://github.com/laravel-hyperf/components/blob/master/src/cache/src/Contracts/Store.php)                                           | &nbsp;                    |
| [LaravelHyperf\Config\Contracts\Repository](https://github.com/laravel-hyperf/components/blob/master/src/config/src/Contracts/Repository.php)                               | `Config`                  |
| [LaravelHyperf\Container\Contracts\Container](https://github.com/laravel-hyperf/components/blob/master/src/container/src/Contracts/Container.php)                               | `App`                  |
| [LaravelHyperf\Foundation\Exceptions\Contracts\ExceptionHandler](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Exceptions/Contracts/ExceptionHandler.php)                               | &nbsp;                  |
| [LaravelHyperf\Encryption\Contracts\Encrypter](https://github.com/laravel-hyperf/components/blob/master/src/encryption/src/Contracts/ReposEncrypteritory.php)                               | `Crypt`                  |
| [LaravelHyperf\Event\Contracts\Dispatcher](https://github.com/laravel-hyperf/components/blob/master/src/event/src/Contracts/Dispatcher.php)                               | `Event`                  |
| [LaravelHyperf\Filesystem\Contracts\Cloud](https://github.com/laravel-hyperf/components/blob/master/src/filesystem/src/Contracts/Cloud.php)                           | `Storage::cloud()`                    |
| [LaravelHyperf\Filesystem\Contracts\Factory](https://github.com/laravel-hyperf/components/blob/master/src/filesystem/src/Contracts/Factory.php)                           | `Storage`                    |
| [LaravelHyperf\Filesystem\Contracts\Filesystem](https://github.com/laravel-hyperf/components/blob/master/src/filesystem/src/Contracts/Filesystem.php)                           | `Storage::disk()`                    |
| [LaravelHyperf\Foundation\Contracts\Application](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Contracts/Application.php)                           | `App`                    |
| [LaravelHyperf\Foundation\Console\Contracts\Application](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Console/Contracts/Application.php)                           | &nbsp;                    |
| [LaravelHyperf\Foundation\Console\Contracts\Kernel](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Console/Contracts/Kernel.php)                           | `Artisan`                    |
| [LaravelHyperf\Hashing\Contracts\Hasher](https://github.com/laravel-hyperf/components/blob/master/src/hashing/src/Contracts/Hasher.php)                           | `Hash`                    |
| [LaravelHyperf\Mail\Contracts\MailQueue](https://github.com/laravel-hyperf/components/blob/master/src/mail/src/Contracts/MailQueue.php)                           | `Mail::queue()`                    |
| [LaravelHyperf\Mail\Contracts\Mailable](https://github.com/laravel-hyperf/components/blob/master/src/mail/src/Contracts/Mailable.php)                           | &nbsp;                    |
| [LaravelHyperf\Mail\Contracts\Mailer](https://github.com/laravel-hyperf/components/blob/master/src/mail/src/Contracts/Mailer.php)                           | `Mail`                    |
| [LaravelHyperf\Notifications\Contracts\Dispatcher](https://github.com/laravel-hyperf/components/blob/master/src/notifications/src/Contracts/Dispatcher.php)                           | `Notification`                    |
| [LaravelHyperf\Notifications\Contracts\Factory](https://github.com/laravel-hyperf/components/blob/master/src/notifications/src/Contracts/Factory.php)                           | `Notification`                    |
| [LaravelHyperf\Queue\Contracts\EntityResolver](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/EntityResolver.php)                           | &nbsp;                    |
| [LaravelHyperf\Queue\Contracts\Factory](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/Factory.php)                           | `Queue`                    |
| [LaravelHyperf\Queue\Contracts\Job](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/Job.php)                           | &nbsp;                    |
| [LaravelHyperf\Queue\Contracts\Monitor](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/Factory.php)                           | `Queue`                    |
| [LaravelHyperf\Queue\Contracts\Queue](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/Queue.php)                           | `Queue::connection()`                    |
| [LaravelHyperf\Queue\Contracts\QueueableCollection](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/QueueableCollection.php)                           | &nbsp;                    |
| [LaravelHyperf\Queue\Contracts\QueueableEntity](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/QueueableEntity.php)                           | &nbsp;                    |
| [LaravelHyperf\Queue\Contracts\ShouldQueue](https://github.com/laravel-hyperf/components/blob/master/src/queue/src/Contracts/ShouldQueue.php)                           | &nbsp;                    |
| [LaravelHyperf\Foundation\Console\Contracts\Schedule](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Console/Contracts/Schedule.php)                           | `Schedule`                    |
| [LaravelHyperf\Foundation\Exceptions\Contracts\ExceptionHandler](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Exceptions/Contracts/ExceptionHandler.php)                           | &nbsp;                    |
| [LaravelHyperf\Foundation\Exceptions\Contracts\ExceptionRenderer](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Exceptions/Contracts/ExceptionRenderer.php)                           | &nbsp;                    |
| [LaravelHyperf\Foundation\Http\Contracts\ExceptionRenderer](https://github.com/laravel-hyperf/components/blob/master/src/foundation/src/Http/Contracts/MiddlewareContract.php)                           | &nbsp;                    |
| [LaravelHyperf\Cookie\Contracts\Cookie](https://github.com/laravel-hyperf/components/blob/master/src/cookie/src/Contracts/Cookie.php)                                     | `Cookie`                  |
| [LaravelHyperf\Http\Contracts\RequestContract](https://github.com/laravel-hyperf/components/blob/master/src/http/src/Contracts/RequestContract.php)                                           | `Request`                    |
| [LaravelHyperf\Http\Contracts\ResponseContract](https://github.com/laravel-hyperf/components/blob/master/src/http/src/Contracts/ResponseContract.php)                                           | `Response`                    |
| [LaravelHyperf\Router\Contracts\UrlGenerator](https://github.com/laravel-hyperf/components/blob/master/src/router/src/Contracts/UrlGenerator.php)                         | `URL`                     |

::: info
The contracts in Hyperf can refer to [hyperf/contract](https://github.com/hyperf/hyperf/tree/master/src/contract/src) package
:::
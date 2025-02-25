# Service Providers
[[toc]]

## Introduction

In Laravel Hyperf, config providers are the core mechanism to provide service discovery like service providers in Laravel. Laravel Hyperf ensures that all components are properly configured and ready for use as soon as the application starts. This approach allows for a modular and flexible configuration system, where each component can manage its own configuration independently.

Laravel Hyperf supports both config providers and service providers.
Service providers are the central place of all Laravel Hyperf application bootstrapping. Your own application, as well as some Laravel Hyperf's core services, are bootstrapped via service providers.

But, what do we mean by "bootstrapped"? In general, we mean **registering** things, including registering service container bindings, event listeners, middleware, and even routes. Service providers are the central place to configure your application.

If you open the `config/app.php` file included with Laravel Hyperf, you will see a providers array. These are all of the service provider classes that will be loaded for your application. By default, a set of Laravel Hyperf core service providers are listed in this array.

In this overview, you will learn how to write your own service providers and register them with your Laravel Hyperf application.

::: note
If you would like to learn more about how Laravel Hyperf handles requests and works internally, check out our documentation on the Laravel [request lifecycle](/docs/lifecycle).
:::

## Writing Config Providers

Config Providers are placed in each root directory of the component. These providers will supply all the configuration information of the corresponding component, which will be started by the Laravel Hyperf framework when loaded.

The final configuration information in Config Providers will be merged into the corresponding implementation class of `Hyperf\Contract\ConfigInterface`. This process enables the configuration initialization of each component when used under the Hyperf framework.

### How to define a ConfigProvider?

```php
<?php

namespace Hyperf\Foo;

class ConfigProvider
{
     public function __invoke(): array
     {
         return [
             'dependencies' => [],
             'annotations' => [
                 'scan' => [
                     'paths' => [
                         __DIR__,
                     ],
                 ],
             ],
             'listeners' => [],
             'publish' => [
                 [
                     'id' => 'config',
                     'description' => 'description of this config file.',
                     'source' => __DIR__ . '/../publish/file.php',
                     'destination' => BASE_PATH . '/config/autoload/file.php',
                 ],
             ],
         ];
     }
}
```

* `dependencies`:
This key is used to define dependency injection configurations. It will be merged into the `config/dependencies.php` file. You can define your dependency bindings here, which is equivalent to binding interfaces in service containers.

* `annotations`:
This key is used to configure annotation scanning. It will be merged into the `config/annotations.php` file. In this example, it sets the scan path to the current directory.

* `commands`:
This key is used to define command classes. It will be merged into commands config array, which can also be understood as corresponding to the `config/commands.php` file. And these commands will be registered when the framework bootstrapped.

* `listeners`:
This key functions similarly to commands and is used to define listeners.

* `publish`:
This key is used to define the component's default configuration files. When the publish command is executed, the file corresponding to the source will be copied to the path corresponding to the destination. In this example, it defines a configuration file with the ID 'config', including a description, source file path, and destination file path.

* `Other configurations`:
In addition to the predefined configuration keys above, you can define other configurations. These configurations will ultimately be merged into the configuration corresponding to ConfigInterface.

## Writing Service Providers

All service providers extend the `LaravelHyperf\Support\ServiceProvider` class. Most service providers contain a `register` and a `boot` method. Within the `register` method, you should **only bind things into the [service container](/docs/container)**. You should never attempt to register any event listeners, routes, or any other piece of functionality within the `register` method.

The Artisan CLI can generate a new provider via the `make:provider` command.

```shell:no-line-numbers
php artisan make:provider RiakServiceProvider
```

### The Register Method

As mentioned previously, within the `register` method, you should only bind things into the [service container](/docs/container). You should never attempt to register any event listeners, routes, or any other piece of functionality within the `register` method. Otherwise, you may accidentally use a service that is provided by a service provider which has not loaded yet.

Let's take a look at a basic service provider. Within any of your service provider methods, you always have access to the `$app` property which provides access to the service container:

```php
<?php

namespace App\Providers;

use App\Services\Riak\Connection;
use LaravelHyperf\Foundation\Contracts\Application;
use LaravelHyperf\Support\ServiceProvider;

class RiakServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Connection::class, function (Application $app) {
            return new Connection(config('riak'));
        });
    }
}
```

This service provider only defines a `register` method, and uses that method to define an implementation of `App\Services\Riak\Connection` in the service container. If you're not yet familiar with Laravel Hyperf's service container, check out [its documentation](/docs/container).

#### The `bindings` and `singletons` Properties

If your service provider registers many simple bindings, you may wish to use the `bindings` property instead of manually registering each container binding. When the service provider is loaded by the framework, it will automatically check for these properties and register their bindings:

```php
<?php

namespace App\Providers;

use App\Contracts\ServerProvider;
use App\Services\DigitalOceanServerProvider;
use LaravelHyperf\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     */
    public array $bindings = [
        ServerProvider::class => DigitalOceanServerProvider::class,
    ];
}
```

:::tip
You can also set these bindings in `config/dependencies.php`.
:::

### The Boot Method

So, what if we need to extend `Request` functions within our service provider? This should be done within the `boot` method. **This method is called after all other service providers have been registered**, meaning you have access to all other services that have been registered by the framework:

```php
<?php

namespace App\Providers;

use LaravelHyperf\Http\Request;
use LaravelHyperf\Foundation\Macros\RequestMacro;
use LaravelHyperf\Support\ServiceProvider;

class RequestServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Request::mixin(new RequestMacro());
    }
}
```

#### Boot Method Dependency Injection

You may type-hint dependencies for your service provider's `boot` method. The [service container](/docs/container) will automatically inject any dependencies you need:

```php
use Hyperf\Database\ConnectionResolverInterface;

/**
 * Bootstrap any application services.
 */
public function boot(ConnectionResolverInterface $resolver): void
{
    $resolver->setDefaultConnection('mysql');
}
```

## Registering Providers

All service providers are registered in the `config/app.php` configuration file. This file contains a `providers` array where you can list the class names of your service providers. By default, a set of Laravel Hyperf core service providers are registered in this array. The default providers bootstrap the core Laravel Hyperf components.

To register your provider, add it to the array:

```php
'providers' => [
    LaravelHyperf\Foundation\Providers\FoundationServiceProvider::class,
    App\Providers\RouteServiceProvider::class,
    App\Providers\AppServiceProvider::class,
    App\Providers\EventServiceProvider::class,
]
```

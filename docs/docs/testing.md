# Testing: Getting Started
[[toc]]

## Introduction

Laravel Hyperf is built with testing in mind. In fact, support for testing with PHPUnit is included out of the box and a `phpunit.xml` file is already set up for your application. The framework also ships with convenient helper methods that allow you to expressively test your applications.

By default, your application's `tests` directory contains two directories: `Feature` and `Unit`. Unit tests are tests that focus on a very small, isolated portion of your code. In fact, most unit tests probably focus on a single method. Feature tests may test a larger portion of your code, including how several objects interact with each other or even a full HTTP request to a JSON endpoint.

An `ExampleTest.php` file is provided in both the `Feature` and `Unit` test directories. After installing a new Laravel Hyperf application, run `vendor/bin/phpunit` on the command line to run your tests.

## Environment

When running tests via `vendor/bin/phpunit`, Laravel Hyperf will automatically set the configuration environment to `testing` because of the environment variables defined in the `phpunit.xml` file. Laravel Hyperf also automatically configures the session and cache to the `array` driver while testing, meaning no session or cache data will be persisted while testing.

You are free to define other testing environment configuration values as necessary. The `testing` environment variables may be configured in the `phpunit.xml` file, but make sure to clear your configuration cache using the `config:clear` Artisan command before running your tests!

## Creating & Running Tests

To create a new test case, use the `make:test` Artisan command:

```shell:no-line-numbers
// Create a test in the Feature directory...
php artisan make:test UserTest

// Create a test in the Unit directory...
php artisan make:test UserTest --unit
```

::: tip
Test stubs may be customized using [stub publishing](/docs/artisan#stub-customization)
:::

Once the test has been generated, you may define test methods as you normally would using PHPUnit. To run your tests, execute the `phpunit` or `artisan test` command from your terminal:

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }
}
```

::: note
If you define your own `setUp` / `tearDown` methods within a test class, be sure to call the respective `parent::setUp()` / `parent::tearDown()` methods on the parent class.
:::
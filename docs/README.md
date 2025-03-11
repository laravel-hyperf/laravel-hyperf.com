---
home: true
title: Laravel Hyperf
heroImage: icon.svg
actions:
  - text: Get Started
    link: /docs/introduction
    type: primary
  - text: GitHub
    link: https://github.com/laravel-hyperf/laravel-hyperf
    type: secondary
features:
  - title: Laravel Friendly
    details: By porting Laravel's core infrastructure and fundamental components, this framework enables Laravel developers to quickly adapt to it.
  - title: High Performance
    details: Leveraging Swoole's native coroutine support, it delivers exceptional performance and efficient concurrency handling.
  - title: Ecosystem Compatibility
    details: Laravel Hyperf is compatible with the Hyperf ecosystem, sharing the same community resources and packages.
footer: MIT Licensed | Copyright © 2024-present Laravel Hyperf
---


## Coding Like in Laravel Framework

Laravel artisans can enjoy a familiar development experience that mirrors the original framework. The simple, elegant syntax remains intact, enabling developers to stay productive while leveraging enhanced performance.

<div class="code-examples-table">
<div class="code-nav">
<ul>
<li class="category-item" data-category="authentication">Authentication</li>
<li class="category-item" data-category="authorization">Authorization</li>
<li class="category-item" data-category="eloquent">Eloquent ORM</li>
<li class="category-item" data-category="migrations">Database Migrations</li>
<li class="category-item" data-category="validation">Validation</li>
<li class="category-item" data-category="notification">Notification and Email</li>
<li class="category-item" data-category="storage">File Storage</li>
<li class="category-item" data-category="queues">Job Queues</li>
<li class="category-item" data-category="scheduling">Task Scheduling</li>
<li class="category-item" data-category="testing">Testing</li>
<li class="category-item" data-category="events">Events</li>
</ul>
</div>

<div class="code-content">
<div class="code-block authentication">

### Authentication

Authenticating users is as simple as adding an authentication middleware to your Laravel Hyperf route definition:

```php
Route::get('/profile', ProfileController::class, [
  'middleware' => 'auth'
]);
```

Once the user is authenticated, you can access the authenticated user via the Auth facade:

```php
use LaravelHyperf\Support\Facades\Auth;

$user = Auth::user();
```

Of course, you may define your own authentication middleware, allowing you to customize the authentication process.

[Read Authentication docs](/docs/authentication)

</div>

<div class="code-block authorization">

### Authorization

You'll often need to check whether an authenticated user is authorized to perform a specific action. Laravel's model policies make it a breeze:

```shell:no-line-numbers
php artisan make:policy UserPolicy
```

Once you've defined your authorization rules in the generated policy class, you can authorize the user's request in your controller methods:

```php
public function update(Request $request, Invoice $invoice)
{
    Gate::authorize('update', $invoice);

    $invoice->update(/* ... */);
}
```

[Read Authorization docs](/docs/authorization)

</div>

<div class="code-block eloquent">

### Eloquent

Scared of databases? Don't be. Laravel Hyperf’s Eloquent ORM makes it painless to interact with your application's data, and models, migrations, and relationships can be quickly scaffolded:

```shell:no-line-numbers
php artisan make:model Invoice --migration
```

Once you've defined your model structure and relationships, you can interact with your database using Eloquent's powerful, expressive syntax:

```php
// Create a related model...
$user->invoices()->create(['amount' => 100]);

// Update a model...
$invoice->update(['amount' => 200]);

// Retrieve models...
$invoices = Invoice::unpaid()->where('amount', '>=', 100)->get();

// Rich API for model interactions...
$invoices->each->pay();
```

[Read Eloquent docs](/docs/eloquent)

</div>

<div class="code-block migrations">

### Database Migrations

Migrations are like version control for your database, allowing your team to define and share your application's database schema definition:


```php
return new class extends Migration {
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->foreignUuid('airline_id')->constrained();
            $table->string('name');
            $table->timestamps();
        });
    }
};
```

[Read Migration docs](/docs/migrations)

</div>

<div class="code-block validation">

### Validation

Laravel has over 90 powerful, built-in validation rules and, using Laravel Hyperf Precognition, can provide live validation on your frontend:

```php
public function update(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email|unique:users',
        'password' => Password::required()->min(8),
    ]);

    $request->user()->update($validated);
}
```

[Read Validation docs](/docs/validation)

</div>

<div class="code-block notification">

### Notifications & Mail

Use Laravel Hyperf to quickly send beautifully styled notifications to your users via email, Slack, SMS, in-app, and more:

```shell:no-line-numbers
php artisan make:notification InvoicePaid
```

Once you have generated a notification, you can easily send the message to one of your application's users:

```php
$user->notify(new InvoicePaid($invoice));
```

[Read Notification and Mail docs](/docs/notifications)

</div>

<div class="code-block storage">

### File Storage

Laravel Hyperf provides a robust filesystem abstraction layer, providing a single, unified API for interacting with local filesystems and cloud based filesystems like Amazon S3:

```php
$path = $request->file('avatar')->store('s3');
```

Regardless of where your files are stored, interact with them using Laravel's simple, elegant syntax:

```php
$content = Storage::get('photo.jpg');

Storage::put('photo.jpg', $content);
```

[Read File Storage docs](/docs/filesystem)

</div>

<div class="code-block queues">

### Job Queues

Laravel Hyperf lets you to offload slow jobs to a background queue, keeping your web requests snappy:

```php
$podcast = Podcast::create(/* ... */);

ProcessPodcast::dispatch($podcast)->onQueue('podcasts');
```

You can run as many queue workers as you need to handle your workload:

```shell:no-line-numbers
php artisan queue:work redis --queue=podcasts
```

[Read Queues docs](/docs/queues)

</div>

<div class="code-block scheduling">

### Task Scheduling

Schedule recurring jobs and commands with an expressive syntax and say goodbye to complicated configuration files:

```php
$schedule->job(NotifySubscribers::class)->hourly();
```

Laravel Hyperf's scheduler can even handle multiple servers and offers built-in overlap prevention:

```php
$schedule->job(NotifySubscribers::class)
    ->dailyAt('9:00')
    ->setOnOneServer(true)
    ->setMutexPool('notify-subscribers');
```

[Read Task Scheduling docs](/docs/scheduling)

</div>

<div class="code-block testing">

### Testing

Laravel Hyperf is built for testing. From unit tests to feature tests, you’ll feel more confident in deploying your application:

```php
class RefreshDatabaseTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateUser()
    {
        $user = factory(User::class)->create();

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
        ]);
    }
}
```

[Read Testing docs](/docs/testing)

</div>

<div class="code-block events">

### Events & Websockets

Laravel Hyperf's events allow you to send and listen for events across your application, and listeners can easily be dispatched to a background queue:

```php
OrderShipped::dispatch($order);
```

```php
class SendShipmentNotification implements ShouldQueue
{
    public function handle(OrderShipped $event): void
    {
        // ...
    }
}
```

Your frontend application can even subscribe to your Laravel Hyperf events using [Laravel Echo](/docs/broadcasting) and WebSockets, allowing you to build real-time, dynamic applications:

```js
Echo.private(`orders.${orderId}`)
    .listen('OrderShipped', (e) => {
        console.log(e.order);
    });
```

[Read Events docs](/docs/events)

</div>

</div>
</div>

## Frequently Asked Questions

<div class="custom-container tip">
<p><strong>Is Laravel Hyperf compatible with Laravel packages?</strong></p>
<p>While Laravel Hyperf maintains the similar development experience like Laravel, you can't install Laravel packages on this framework due to the fundamental differences in architecture. However, many Laravel concepts and patterns can be easily adapted for use with Laravel Hyperf.</p>
</div>

<div class="custom-container tip">
<p><strong>How does Laravel Hyperf achieve high performance?</strong></p>
<p>Laravel Hyperf achieves high performance through Swoole's coroutine system, which enables non-blocking I/O operations and efficient concurrency handling. This allows the framework to handle more concurrent connections with fewer resources compared to traditional PHP-FPM.</p>
</div>

<div class="custom-container tip">
<p><strong>Why don't we just use Octane directly?</strong></p>
<p> Octane accelerates Laravel by maintaining the framework in a persistent application state, resetting request-scoped resources between requests. However, it doesn't introduce non-blocking I/O capabilities to Laravel's architecture.

In contrast, Laravel Hyperf natively implements coroutines and is architected specifically for persistent application states. This fundamental design difference delivers exceptional performance and concurrency capabilities without the resource overhead of multiple processes, enabling truly efficient scaling even under high I/O workloads.
</p>
</div>

<script>
export default {
  mounted() {
    const categoryItems = document.querySelectorAll('.category-item');
    const codeBlocks = document.querySelectorAll('.code-block');
    let lastActiveItem = categoryItems[0];

    // Show first code block and category by default
    if (lastActiveItem) {
      lastActiveItem.classList.add('active');
      const firstBlock = codeBlocks[0];
      if (firstBlock) {
        firstBlock.classList.add('active');
      }
    }

    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');

        // Update code blocks
        codeBlocks.forEach(block => {
          block.classList.remove('active');
        });

        const selectedBlock = document.querySelector(`.${category}`);
        if (selectedBlock) {
          selectedBlock.classList.add('active');
        }

        // Update category items
        if (lastActiveItem) {
          lastActiveItem.classList.remove('active');
        }
        item.classList.add('active');
        lastActiveItem = item;
      });
    });
  }
}
</script>

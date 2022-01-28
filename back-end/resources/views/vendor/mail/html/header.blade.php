<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
{{-- <img src="https://laravel.com/img/notification-logo.png" class="logo"> --}}
<img src="http://localhost:8000/storage/logo.png" alt="{{ config('app.name') }}" class="logo"/>
@else
<img src="http://localhost:8000/storage/logo.png" class="logo"/>
@endif
</a>
</td>
</tr>

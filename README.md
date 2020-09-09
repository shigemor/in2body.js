# in2body.js
This module inserts CSS classes into the body element.

```js
<body class="desktop windows chrome month8 date19 dayWed hour16 min40 sec0 portrait BPxs YR0 XR0">
```
## Installation
Place the following <script> near the end of your pages, right before the closing body tag, to enable them.

```js
<script src="path/to/in2body.min.js" charset="utf-8"></script>
```

## Quick start
Included in2body.js in your project and run.

```js
<script charset="utf-8">
    in2body.run();
</script>
```

Please check the body element.
```js
<body class="desktop windows chrome landscape BPmd YR0 XR0">
```

## EXAMPLES
###### Full Options
```js
in2body.run({
	is_device :		true,
	is_product :		true,	// Operating System
	is_browser :		true,	// Web browsers

	is_edge_legacy :	true,	// "edge_legacy" is Not Chromium-based version Microsoft Edge
	is_safari_like :	true,	// "safari_like" is Using the AppleWebKit

	is_ie :			true,	// "ie" is Microsoft Internet Explorer FLAG

	is_breakpoint :		true,	// Responsive breakpoints
	is_orientation :	true,
	is_square :		true,
	is_yratio :		true,	// Y position for scroll
	is_xratio :		true,	// X position for scroll

	is_month :		true,
	is_date :		true,
	is_day :		true,	// Day of the week

	is_hour :		true,
	is_min :		true,
	is_sec :		true
});
```
```js
<body class="desktop windows chrome month8 date19 dayWed hour16 min40 sec0 portrait BPxs YR0 XR0">
```

###### All OFF Options
```js
in2body.run({
	is_device :		false,
	is_product :		false,	// Operating System
	is_browser :		false,	// Web browsers

	is_edge_legacy :	false,	// "edge_legacy" is Not Chromium-based version Microsoft Edge
	is_safari_like :	false,	// "safari_like" is Using the AppleWebKit

	is_ie :			false,	// "ie" is Microsoft Internet Explorer FLAG

	is_breakpoint :		false,	// Responsive breakpoints
	is_orientation :	false,
	is_square :		false,
	is_yratio :		false,	// Y position for scroll
	is_xratio :		false,	// X position for scroll

	is_month :		false,
	is_date :		false,
	is_day :		false,	// Day of the week

	is_hour :		false,
	is_min :		false,
	is_sec :		false
});
```
```js
<body>
```

## Options
| Name | Description |
| --- | --- |
| `is_device` | `phone` `tablet` `desktop` |
| `is_product` | `windows` `mac` `ipod` `iphone` `ipad` `android` `kindle` `blackberry` `meego` `windowsphone` `nintendo3ds` `nintendowiiu` `nintendoswitch` `playstation` `playstationvita` `playstationportable` `microsoftxbox` `linux` `bsd` `amazonfiretv` `appletv`  |

| Name | Description |
| --- | --- |
| `is_browser` | `ie6` `ie7` `ie8` `ie9` `ie10` `ie11` `edge` `chrome` `firefox` `safari` `opera` `blackberrybrowser` `blackberryplaybook` `netfront` `nintendobrowser` |
| `is_edge_legacy` | Add `edge_legacy` Not Chromium-based version Microsoft Edge |
| `is_safari_like` | Add `safari_like` Using the AppleWebKit browser |
| `is_ie` | Add Microsoft Internet Explorer FLAG(Class) `ie` |

###### is_breakpoint `BP`
| Name | Description |
| --- | --- |
| `xxl` | Extra extra large / larger desktops ( ≥1400px) |
| `xl` | Extra large / wide desktops ( ≥1200px) |
| `lg` | Large / desktops ( ≥992px) |
| `md` | Medium / tablets ( ≥768px) |
| `sm` | Small / landscape phones ( ≥576px) |
| `xs` | Extra small / portrait phones( <576px) |


| Name | Description |
| --- | --- |
| `is_orientation` | `portrait` `landscape` |
| `is_square` | Add `square` |

| Name | Description |
| --- | --- |
| `is_yratio` | Y position for scroll 0-100 (Every 10 percent) `YR0-100` |
| `is_xratio` | X position for scroll 0-100 (Every 10 percent) `YR0-100` |

| Name | Description |
| --- | --- |
| `is_month` | 1-12 |
| `is_date` | 1-31 |
| `is_day` | `Sun` `Mon` `Tue` `Wed` `Thu` `Fri` `Sat` |

| Name | Description |
| --- | --- |
| `is_hour` | 0-23 |
| `is_min` | 0-50 (Every 10 minutes) |
| `is_sec` | 0-50 (Every 10 seconds) |



## Secret Command
###### Get Value
```js
console.log( in2body.get('device'));
console.log( in2body.get('product'));
console.log( in2body.get('browser'));
console.log( in2body.get('is_ie'));

console.log( in2body.get('breakpoint'));
console.log( in2body.get('orientation'));
console.log( in2body.get('pageYRatio'));	// Y position for scroll 0-100 (Every 10 percent)
console.log( in2body.get('pageYRatio_finely'));	// Y position for scroll 0-100 (Every 1 percent)
console.log( in2body.get('pageXRatio'));	// X position for scroll 0-100 (Every 10 percent)
console.log( in2body.get('pageXRatio_finely'));	// X position for scroll 0-100 (Every 1 percent)

console.log( in2body.get('year'));
console.log( in2body.get('month'));
console.log( in2body.get('date'));
console.log( in2body.get('day'));

console.log( in2body.get('hour'));
console.log( in2body.get('min'));
console.log( in2body.get('sec'));

console.log( in2body.get('window.Height'));	// window.innerHeight
console.log( in2body.get('window.Width'));	// window.innerWidth
console.log( in2body.get('client.Height'));	// document.documentElement.clientHeight
console.log( in2body.get('client.Width'));	// document.documentElement.clientWidth
console.log( in2body.get('document.Height'));	// full document Height
console.log( in2body.get('document.Width'));	// full document Width
console.log( in2body.get('pageYOffset'));	// window.pageYOffset
console.log( in2body.get('pageXOffset'));	// window.pageXOffset

console.log( in2body.get('version'));
```

###### Update Value
```js
in2body.Update();
```

###### Remove EventListener
```js
in2body.Remove_Event();
```

###### Add EventListener
```js
in2body.Add_Event();
```

Modalizer.js
==

Lightweight extension over bootstrap's modals to improve of the control, animations and visualization of modal windows.

![GitHub](https://img.shields.io/github/license/jlgarridol/modalizer.js?style=flat) [![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/jlgarridol/modalizerjs?style=flat)](https://github.com/jlgarridol/modalizer.js/releases) ![GitHub file size in bytes](https://img.shields.io/github/size/jlgarridol/modalizer.js/dist/js/modalizer.min.js?color=f7df1e&label=size&logo=javascript&style=flat) ![GitHub file size in bytes](https://img.shields.io/github/size/jlgarridol/modalizer.js/dist/css/modalizer.min.css?color=036fb8&label=size&logo=css3&logoColor=036fb8&style=flat) 
---
Getting starting
--
### Installation
Via npm
```bash
$ npm install modalizer.js
```
or add it directly using a CDN:
```html
<link rel="stylesheet" href="https://future/modalizer.min.css"/>
<script src="https://future/modalizer.min.js"></script>
```

### Basic usage
#### Launch modal
Add class modalinit and modal's identifier in ```data-modal``` attribute to a ```<a>```, ```<buttom>``` or any else HTML element.

Add class ```modalizer``` to the modal div.

**Example:**
```html
<a class="modalinit" data-modal="standart" href="#"> Click to open</a>

<div class="modal modalizer fade" id="standart" tabindex= "-1" role="dialog">
    ...
</div>
```

#### Close a modal
Add class ```closemodal``` to a ```<a>```, ```<buttom>``` or any else HTML element inside a modal ```div```.

**Example:**
```html
<div class="modal modalizer fade" id="standart" tabindex= "-1" role="dialog">
    ...
    <button class="closemodal">Close</button>
    ...
</div>
```

### Animate a modal

Use a Animate.css animation for open and close animation.

Add ```data-animate-in``` and ```data-animate-out``` with Animate.css animation (without ```animate__```), remove class ```fade``` and add class ```animate__animated``` in modal.

**Example:**
```html
<div class="modal modalizer animate__animated" id="standart" tabindex= "-1" role="dialog" data-animate-in="zoomIn" data-animate-out="zoomOut">
        ...
</div>
```

### Optionable modals
A optionable modal is which have multiple submodals inside and the user can navigate it between their.

To transform a modal into an optionable you need to add the ```modal-optionable``` class and assign a ```data-stack``` to it.
It is necessary create a instance of ```MOD_Stack``` with the same name in the *javascript*.

**Example:**
```html
<div class="modal modalizer fade modal-optionable" data-stack="defaultStack" id="standart" tabindex= "-1" role="dialog">
    ...
</div>
<script>
    const defaultStack = new MOD_Stack();
</script>
```

#### Create submodals

The submodals are the ```modal-dialog``` with ```role="document"``` and have full compatibility with classes for ```modal-dialog``` in *Bootstrap* like ```centered``` or ```scrollable```.

Any submodal, except the first, must have the style attribute ```display: none```.

To navigate between submodals exists two classes: ```nextaction``` and ```beforeaction``` to apply to a ```<a>```, ```<button>``` or any alse HTML element.
Also, it is necessary to add the attribute ```data-next``` with the identifier of the next submodal. If this attribute is not there then the modal will end.

In the case of going backwards, the highest submodal in the stack will go. If the stack is empty then the modal will be closed.
In addition, to enable the animation between submodals it is necessary add class ```animate__animated``` in the submodal.

**Example:**
```html
<div class="modal modalizer fade modal-optionable" data-stack="defaultStack" id="standart" tabindex= "-1" role="dialog">
    <div class="modal-dialog animate__animated" id="first_submodal" role="document">
        ...
        <button class="beforeaction">Before</button>
        <button class="nextaction" data-next="last_submodal">Next</button>
        ...
    </div>
    <div class="modal-dialog animate__animated" id="last_submodal" role="document" style="display: none">
        ...
        <button class="beforeaction">Before</button>
        <button class="nextaction">Next</button>
        ...
    </div>
</div>
```

### Fullscreen modal
For a fullscreen modal it is necessary add the class ```fullscreen``` to the ```div```s with classes ```modal-dialog```, ```modal-content```, ```modal-header``` and ```modal-footer```. To make it only for mobile screens you have to add ```-sm``` to ```fullscreen```.

### Blur background
For blur background on modal open it is neccesary include all HTML elements (except modals) inside a ```div``` with the identifier and class ```MOD_supreme-container```

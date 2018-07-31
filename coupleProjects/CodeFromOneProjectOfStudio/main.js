// Array From Polyfill
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}
// Array From Polyfill End

// For Each Polyfill Start


if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Положим O равным результату вызова ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Положим lenValue равным результату вызова внутреннего метода Get объекта O с аргументом "length".
        // 3. Положим len равным ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. Если IsCallable(callback) равен false, выкинем исключение TypeError.
        // Смотрите: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Положим k равным 0
        k = 0;

        // 7. Пока k < len, будем повторять
        while (k < len) {

            var kValue;

            // a. Положим Pk равным ToString(k).
            //   Это неявное преобразование для левостороннего операнда в операторе in
            // b. Положим kPresent равным результату вызова внутреннего метода HasProperty объекта O с аргументом Pk.
            //   Этот шаг может быть объединён с шагом c
            // c. Если kPresent равен true, то
            if (k in O) {

                // i. Положим kValue равным результату вызова внутреннего метода Get объекта O с аргументом Pk.
                kValue = O[k];

                // ii. Вызовем внутренний метод Call функции callback с объектом T в качестве значения this и
                // списком аргументов, содержащим kValue, k и O.
                callback.call(T, kValue, k, O);
            }
            // d. Увеличим k на 1.
            k++;
        }
        // 8. Вернём undefined.
    };
}


// For Each Polyfill End

// Price range slider
function addSpace(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

function fadeInV(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

function fadeOutV(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function postXhr (url, data, csrf, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(JSON.parse(xhr.responseText)); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRF-TOKEN', csrf);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getXhr(url, success, data) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(this.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    return xhr;
}

function holdFunc(selector, thisClass, control) {
    callHook(selector, function (i) {
        (function (i) {
            setTimeout(function () {
                if (control === 'remove') {
                    selector[i].classList.remove(thisClass);
                } else {
                    selector[i].classList.add(thisClass);
                }
            },i);
        })(i);
    });
}

function callEvent(element, eventName, output) {
    'use strict';
    var checkThis = element === null?window:element;
    return checkThis.addEventListener(eventName, function (event) {
        output(event, this);
    }, false);
}

function toggleThis(showEl, classCtrl) {'use strict';!showEl.classList.contains(classCtrl)?showEl.classList.add(classCtrl):showEl.classList.remove(classCtrl);}
function getSelector(selector) {return document.querySelector(selector);}
function getAll(selectors) {return document.querySelectorAll(selectors);}
function callHook(s, call){for(var i=0;i<s.length;i++) {call(i)}}
function isM(ref, tag) {return ref.matches(tag);}



// Init Plugins

(function () {
    'use strict';
    // new Dragdealer('t-jumbotronBottomContentSection');

    if (device.mobile() || window.innerWidth < 768) {
        $('.t-benefitsInsideWrapper').slick({
            dots: true,
            arrows: false
        });
    }
})();


$(document).ready(function() {

    // Init simple Parallax

    function showDownEl(selector, secondSelector, thirdEl, startPoint, opacityCall) {
        var getEl = getSelector(selector),
            secondEl = getSelector(secondSelector),
            thirdEl = getSelector(thirdEl),
            getElPos = getEl.offsetTop,
            getElHeight = getEl.getBoundingClientRect().height;
        var getElNewPos = getElPos + getElHeight;
        var getScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var bodyOffset = document.body.scrollHeight;
        // var getZone = bodyOffset - getElNewPos;
        var getWinHeight = window.innerHeight;
        // var valueZone = (getScrollTop + getWinHeight) - getElNewPos;
        // var getAllNewZz = 100 / getZone * valueZone;
            if(getElNewPos <= (getScrollTop + getWinHeight)) {
                // secondEl.style.bottom = (startPoint + (getScrollTop + getWinHeight - getElNewPos)/.9) + 'px';
                thirdEl.style.opacity = '1';
            } else {
                thirdEl.style.opacity = '0';
            }

    }
    // When some block visible
    function controlVisible(container) {
        var elementPosition = {
                top: window.pageYOffset + container.getBoundingClientRect().top,
                left: window.pageXOffset + container.getBoundingClientRect().left,
                right: window.pageXOffset + container.getBoundingClientRect().right,
                bottom: window.pageYOffset + container.getBoundingClientRect().bottom
            },
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };
        return elementPosition.bottom > windowPosition.top &&
            elementPosition.top < windowPosition.bottom &&
            elementPosition.right > windowPosition.left &&
            elementPosition.left < windowPosition.right
    }

    // Get Document Height
    var getDocHeight = function () {
        var body = document.body,
            html = document.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    };
    // GetBottom Position Function
    var getBottomPosition = function (thisTrue, thisFalse) {
        var getScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var getWindowHeight = window.innerHeight;
        if(getScrollTop + getWindowHeight >= getDocHeight()) {
            thisTrue();
        } else {
            thisFalse();
        }
    };
    // getBottomPosition(function () {}, function () {}); // GetBottom Position call


    (function () {
        var wrapperNav = getSelector('.t-jumbotronTopFilterHoldWrapper');
        var btn = getSelector('.t-jumbotronTopFilterHoldWrapper .t-hiddenButtonMenu');
        var vLinks = getSelector('.t-jumbotronTopFilterHoldWrapper .t-jumbotronTopFilter');
        var hLinks = getSelector('.t-jumbotronTopFilterHoldWrapper .t-hidden-links')

        var numOFItems = 0;
        var totalSpace = 0;
        var breakWidths = [];


        Array.prototype.forEach.call(vLinks.querySelectorAll('li'), function (data, i) {
            totalSpace += data.offsetWidth;
            numOFItems += 1;
            breakWidths.push(totalSpace);
        });
        var availableSpace, numOfVisibleItems, requiredSpace;
        
        function check() {
            availableSpace = parseInt(getComputedNotFix(wrapperNav).width) + parseInt(getComputedNotFix(vLinks.children[0]).marginLeft) - 16;
            numOfVisibleItems = vLinks.children.length;
            requiredSpace = breakWidths[numOfVisibleItems - 1];

            if(requiredSpace > availableSpace) {
                hLinks.prepend(vLinks.children[vLinks.children.length -1]);
                numOfVisibleItems -= 1;
                check();
            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
                vLinks.append(hLinks.children[0]);
                numOfVisibleItems += 1;
            }

            btn.setAttribute('data-count', ''+ numOFItems - numOfVisibleItems +'');
            numOfVisibleItems === numOFItems?btn.classList.add('hidden'):btn.classList.remove('hidden');

        }

        callEvent(null, 'resize', function (event, data) {
            if(window.innerWidth > 767) {check();}
        });

        if(window.innerWidth > 767) {check();}
    })();


    // Init ScrollSpy
    (function (sections, header, navItems) {
        'use strict';
        var lastId,
            getTopMenu = getSelector(header),
            getTopMenuHeight = getTopMenu.getBoundingClientRect().height;
        var menuItems = Array.from(getTopMenu.querySelectorAll(navItems));
        var getSections = getAll(sections);
        var scrollItemsArray = Array.from(getSections);
        var current;
        var id;
        window.addEventListener('scroll', function () {
            var getNewHeaderHeight = getTopMenu.getBoundingClientRect().height;
            var fromTop = this.scrollY + getTopMenuHeight;
            callHook(getSections, function (i) {
                if((getSections[i].offsetTop) - (window.innerHeight / 2) < fromTop) {current = getSections[i];}
            });
            id = scrollItemsArray.indexOf(current);
            if (lastId !== id) {
                lastId = id;
                callHook(menuItems, function (i) {menuItems[i].classList.remove('active');});
                menuItems[lastId].classList.add('active')
            }
        }, false);
    })('.t-mainSectionCtrl', 'header', '.t-navItemTrue a'); // Call ScrollSpy

    function getComputed (el) {return  window.getComputedStyle(getSelector(el), null);}
    function getComputedNotFix (el) {return  window.getComputedStyle(el, null);}

    function getCalculate(selectorChild, selectorParent) {
        var getCurrentPosition;
        var getChild = parseInt(getComputed(selectorChild).top);
        var getParent = parseInt(getComputed(selectorParent).height);
        getCurrentPosition = (getChild / getParent) * 100;
        return getCurrentPosition;
    }

    function getNewCalc() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
            winHeight = document.documentElement.clientHeight,
            docHeight = document.documentElement.scrollHeight;
        var scrollPercent = (scrollTop) / (docHeight - winHeight) / 2;
        var scrollPercentRounded = Math.round((scrollPercent*100)*2);
        return scrollPercentRounded
    }

    var startPoint = parseInt(getComputed('.t-moon').bottom);

    function showHeader (header, addClass) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 300) {
            getSelector(header).classList.add(addClass);
        } else {
            getSelector(header).classList.remove(addClass);
        }
    }

    window.addEventListener('scroll', function () {
        showDownEl('.t-contactsAndFeedBack', '.t-moon', '.t-moonGradient', startPoint, true);
        showHeader('header', 't-stickyHeader');
    }, false);

    function parallax(selector, range){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        selector.style.transform =  'translate3d(0,'+ -(scrollTop*range) +'px, 0)';
    }

    function opacityBlock (conatiner) {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        var getContainerHeight =  getSelector(conatiner).getBoundingClientRect().height;
        if (getContainerHeight >= scrolled) {
            getSelector(conatiner).style.opacity = 1 - scrolled / (getSelector(conatiner).getBoundingClientRect().height / 2);
        }
    }

    function getCords(elem) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left
        };
    }

    function scrollToEl(id) {
        var element = document.getElementById(id);
        var element_coord = getCords(element);

        var startY = window.pageYOffset || document.documentElement.scrollTop;
        var stopY = element_coord.top - 100;

        var distance = stopY > startY ? stopY - startY : startY - stopY;

        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;

        if (stopY > startY) {
            for (var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            }
        } else {
            for (var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }
        }
    }

    var getNavItems = getAll('.t-navItem a');
    callHook(getNavItems, function (i) {
        getNavItems[i].addEventListener('click', function (e) {
            e.preventDefault();
            var splitHash = this.hash.split('#')[1];
            scrollToEl(splitHash);
        }, false);
    });

    window.addEventListener('scroll', function (e) {
        if(!device.mobile() || window.innerWidth > 768) {
            parallax(getSelector('.t-astronaut'), .3);
            parallax(getSelector('.background'), .2);
            opacityBlock('.t-figureContainer');
        }
    }, false);


    var getBars = getSelector('.t-bars');
    var getNavigation = getSelector('.t-headerNavigation');
    var getCloseMenuButton = getSelector('.t-closeMobileMenu');

    var getCartButton = getSelector('.t-headerCart');
    var getCartBlock = getSelector('.t-cartSuperWrapper');
    var getCloseCartButton = getSelector('.t-closeCart');

    var getMakeOrderButton = getSelector('.t-cartMakeOrderButtonHolder .t-btn');
    var getCheckOutBlock = getSelector('.t-checkOutSuperWrapper');
    var closeCheckOut = getSelector('.t-closeCheckOut');


    callEvent(getBars, 'click', function (event, data) {
        fadeInV(getSelector('.t-overlay'), 'block');
        toggleThis(getNavigation, 't-showMobileMenu');
    });

    callEvent(getCloseMenuButton, 'click', function (event, data) {
        fadeOutV(getSelector('.t-overlay'));
        toggleThis(getNavigation, 't-showMobileMenu');
    });

    callEvent(getMakeOrderButton, 'click', function (event, data) {
        fadeOutV(getSelector('.t-overlay'));
        toggleThis(getCheckOutBlock, 't-showCheckOut');
        toggleThis(getCartBlock, 't-showCart');
    });

    callEvent(closeCheckOut, 'click', function (event, data) {
        toggleThis(getCheckOutBlock, 't-showCheckOut');
    });

    callEvent(getCartButton, 'click', function (event, data) {
        fadeInV(getSelector('.t-overlay'), 'block');
        toggleThis(getCartBlock, 't-showCart');
    });

    callEvent(getCloseCartButton, 'click', function (event, data) {
        fadeOutV(getSelector('.t-overlay'));
        toggleThis(getCartBlock, 't-showCart');
    });

    callEvent(getSelector('.t-overlay'), 'click', function (event, data) {
        if(getCartBlock.classList.contains('t-showCart')) {getCartBlock.classList.remove('t-showCart')}
        if(getNavigation.classList.contains('t-showMobileMenu')) {getNavigation.classList.remove('t-showMobileMenu')}
        fadeOutV(data);
    });


    // Insert After Function
    function insertAfter(elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if(next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    }

    // Wrap Element Function
    function wrpF(query, tag) {
        callHook(query, function (i) {
            var crt = document.createElement(tag);
            var getClass = query[i].getAttribute('class');
            crt.classList.add(getClass+'Wrapper');
            query[i].parentNode.insertBefore(crt, query[i]);
            crt.appendChild(query[i]);
        })
    }
    wrpF(getAll('.t-customOptions'), 'div'); // Call Wrap Element Function

    // Create Element Function
    function createElem(tag, addCl) {
        var createElem = document.createElement(tag);
        if (addCl === undefined) {
            return createElem;
        } else {
            createElem.classList.addMany(addCl);
            return createElem;
        }
    }
    // Add Many Classes function
    DOMTokenList.prototype.addMany = function(classes) {
        var array = classes.split(' ');
        for (var i = 0, length = array.length; i < length; i++) {
            this.add(array[i]);
        }
    };
    // Check input fields on null
    function checkInputsNull(elemArr, count, all, a, b) {
        callHook(elemArr, function (i) {
            if(+elemArr[i].value === 0){count++;}
        });
        if (all === 'all') {
            count === elemArr.length?a():b();
        } else {
            count === elemArr.length - 1?a():b();
        }
    }

    function createSubMenu(selector, outputRef, size) {
        'use strict';
        if(window.innerWidth < size) {
            outputRef.style.display = 'block';
            outputRef.nextElementSibling.style.display = 'none';
            if (outputRef.classList.contains('t-subMenuReady')) {
                return false;
            }
            var arr = [];
            var obj = {};
            var createOutput = createElem('select', 't-mobileSubMenu');

            callHook(selector, function (i) {
                var getEls = selector[i];
                obj = {
                    getClassName: getEls.getAttribute('class'),
                    getDataAtr: getEls.getAttribute('data-topfilter'),
                    getTextIn: getEls.querySelector('a').innerText
                };
                arr.push(obj);
            });

            for (var item in arr) {
                var getClassName = arr[item].getClassName;
                var getDataAtr = arr[item].getDataAtr;
                var getTextIn = arr[item].getTextIn;
                var createOption = createElem('option');
                createOption.setAttribute('data-topfilter', getDataAtr);
                createOption.innerText = getTextIn;
                createOption.classList.add('t-mobileListOption', getClassName);
                createOutput.appendChild(createOption);
            }
            outputRef.appendChild(createOutput);
            outputRef.classList.add('t-subMenuReady');
            var getOption = getAll('.t-mobileListOption');
            callHook(getOption, function (i) {
                if(getOption[i].classList.contains('null')) {
                    getOption[i].classList.remove('null');
                }
                if(getOption[i].classList.contains('active')) {
                    getOption[i].setAttribute('selected', 'selected');
                }
            });
        } else {
            outputRef.style.display = 'none';
            outputRef.classList.remove('t-subMenuReady');
            outputRef.innerHTML = '';
            outputRef.nextElementSibling.style.display = 'flex';
        }
    }

    createSubMenu(getAll('.t-jumbotronTopFilter li'), getSelector('.t-submenuHolder'), 768);

    window.addEventListener('resize', function (event) {
        createSubMenu(getAll('.t-jumbotronTopFilter li'), getSelector('.t-submenuHolder'), 768);
    }, false);


    // Create Styled Select option
    (function (select) {
        'use strict';
        var hideParent = 'display: none; visibility: hidden; padding-right: 10px;';
        callHook(select, function (i) {
            var crtEl = createElem('div', 't-styledSelectorBox');
            var getHook = select[i];
            var caOpt = getHook.children;
            getHook.style.cssText = hideParent;
            getHook.parentNode.appendChild(crtEl);
            var getBox = getHook.nextSibling;
            getBox.innerText = getHook.children[0].innerText;
            var $list = createElem('ul', 't-listOptions');
            insertAfter($list,getBox);
            callHook(caOpt, function (i) {
                var crtLi = createElem('li', 't-options');
                crtLi.innerText = getHook.children[i].innerText;
                crtLi.setAttribute('data-value', getHook.children[i].value);
                if(getHook.children[i].dataset) {
                    var getData = getHook.children[i].dataset;
                    for (var item in getData) {
                        crtLi.setAttribute('data-'+ item +'', getData[item]);
                    }
                }
                $list.appendChild(crtLi);
            });
            var getChList = $list.children;
            getBox.addEventListener('click', function (e) {
                e.stopPropagation();
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    fadeOutV(this.nextSibling);
                } else {
                    this.classList.add('active');
                    fadeInV(this.nextSibling);
                }
            }, false);
            callHook(getChList, function (i) {
                getChList[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (getBox.classList.contains('active')) {
                        getBox.classList.remove('active');
                        getBox.nextSibling.style.display = 'none';
                    }
                    getBox.previousSibling.value = this.dataset.value;
                    getBox.innerText = this.innerText;
                },false);
            });
            window.addEventListener('click', function (e) {
                if(getBox.classList.contains('active')) {
                    getBox.classList.remove('active');
                    getBox.nextSibling.style.display = 'none';
                }
            })
        });
    })(getAll('.t-customOptions'));

    // Create Styled Select option End

    // Change Value In Cards Picker
    function showEdit(clElement, sElement, dir) {
        if(dir === 'forward') {
            if(!clElement.classList.contains('active')) {
                clElement.classList.add('active');
                clElement.children[0].style.display = 'none';
                sElement.style.display = 'block';
                sElement.focus();
            }
        } else {
            if(clElement.classList.contains('active')) {
                clElement.children[0].style.display = 'flex';
                sElement.style.display = 'none';
                sElement.value = '';
                clElement.classList.remove('active');
            }
        }
    }

    callEvent(getSelector('.t-conrolNavigationWrapper'), 'click', function (event, data) {
        event.stopPropagation();
        showEdit(data, data.querySelector('input'), 'forward')
    });
    
    callEvent(null, 'click', function (event, data) {
        event.stopPropagation();
        showEdit(getSelector('.t-conrolNavigationWrapper'), getSelector('.t-conrolNavigationWrapper').querySelector('input'), '');
    });


    // function getPosition(element) {
    //     var position = {
    //         top: element.offsetTop,
    //         left: element.offsetLeft
    //     };
    //     return position;
    // }

    function CallScrollMouseWheel(thisEv, findEl, parentWithPadding, progressBar) {
        this.ev = thisEv;
        this.element = findEl;
        this.getProgress = getSelector(progressBar);
        this.parentWithPad = parseInt(getComputedNotFix(getSelector(parentWithPadding)).paddingRight);
        this.elementHeight = getSelector(this.element).clientHeight;
        getSelector(this.ev).style.height = this.elementHeight+'px';
        this.createThisEvent(thisEv, findEl, this.getProgress);
    }
    CallScrollMouseWheel.prototype.createThisEvent = function (t, findEl, progress) {
        var scrollLeft = 0, scrollTarget = 0, scrollValue = 0;
        var b = getSelector(t);
        var grabCards = b.querySelectorAll(findEl);
        var getLastEl = grabCards[grabCards.length - 1];
        var getLeftPos = this.getPosition(getLastEl).left;
        var widthLastEl = getLastEl.getBoundingClientRect().width;
        var limitPosition = (getLeftPos + widthLastEl - window.innerWidth) + this.parentWithPad * 2;
        var arr = [];
        var getAllChildCards = b.children[0].children;
        var sum = 0;
        callHook(getAllChildCards, function (i) {arr.push(getAllChildCards[i].clientWidth + parseInt(getComputedNotFix(getAllChildCards[i]).marginRight));});
        callHook(arr, function (i) {sum = sum + parseInt(arr[i]);});
        function scrollThis(event) {
            scrollTarget += event.deltaY * 1;
            scrollTarget = Math.round(Math.max(scrollLeft, Math.min(scrollTarget, limitPosition)));
            scrollValue += (scrollTarget - scrollValue) * .3;
            b.children[0].style.transform = 'translate3d(' + Math.round(-scrollValue) + 'px, 0 ,0)';
            // progress.children[0].style.width = ((sum - b.clientWidth) * Math.round(Math.floor(scrollValue))) / 100 + '%';
        }
        callEvent(b, 'mousewheel', function (event) {
            scrollThis(event);
        });
    };
    CallScrollMouseWheel.prototype.getPosition = function (element) {
        var position = {
            top: element.offsetTop,
            left: element.offsetLeft
        };
        return position;
    };

// Constructor Start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Split Text And Append Text in span. Function.
    function splitText(elem) {
        var wrapper = document.createElement('span');
        return elem.innerText.trim().split('').map(function (char) {
            var parent = wrapper.cloneNode();
            parent.insertAdjacentHTML('afterbegin', char === ' ' ? '&nbsp;' : char);
            return parent;
        });
    }
    // Create Container And append spans in this container.
    function appendText(elem) {
        var container = document.createElement('div');
        var getLetters = splitText(elem);
        callHook(getLetters, function (i) {container.appendChild(getLetters[i]);});
        elem.innerHTML = '';elem.appendChild(container);
    }
    function arcText(elem, radius, dir) {
        appendText(elem); // Call container with spans.
        var offset = 0,
            origin = 'center ' + (radius) + 'px',
            delta = (180/Math.PI),
            ch = parseInt(getComputedNotFix(elem.querySelector('span')).lineHeight, 10);

        if (dir === -1) {origin = 'center ' + (-radius + ch) + 'px';}
        var getSpanWr = elem.querySelectorAll('span');
        callHook(getSpanWr, function (i) {
            var getHook = getSpanWr[i];
            offset += parseInt(getComputedNotFix(getHook).fontSize, 10) / 2.1 / (radius-ch) * delta;
            getHook.setAttribute('rot', offset);
            offset += parseInt(getComputedNotFix(getHook).fontSize, 10) / 2.1 / (radius-ch) * delta;
        });
        callHook(getSpanWr, function (i) {
            var getHook = getSpanWr[i],
                rotate = (-offset * dir / 2) + getHook.getAttribute('rot') * dir,
                transform = 'rotate('+ rotate +'deg)';
            dir === -1 ? getHook.style.bottom = '0' : getHook.style.top = '0';
            getHook.classList.add('letter'+ i +'');
            getHook.style.left = '50%';
            getHook.style.marginLeft = -parseInt(getComputedNotFix(getHook).fontSize, 10) / 2.1 + 'px';
            getHook.style.position = 'absolute';
            getHook.style.transform = transform;
            getHook.style.transformOrigin = origin;
            getHook.style.webkitTransform = transform;
            getHook.style.webkitTransformOrigin = origin;

        })
    }
    // arcText(getSelector('.t-constructorStickerTextOne div'), 127, 1); // Call Arc Text Function Top Direction
    // arcText(getSelector('.t-constructorStickerTextTwo div'), 127, -1); // Call Arc Text Function Bottom Direction

    // Main Check Zero Function Check click on buttons
    function mainCheckZeroFunction (t, checkClass, wrpCard) {
        var b = t;
        var getInput = b.parentNode.parentNode.querySelector('input');
        var getAllInputs = wrpCard.getElementsByTagName('input');
        var getQ = b.parentNode.parentNode.parentNode.parentNode.querySelector('div');
        var zero_count = 0;
        if(b.classList.contains(checkClass)) {
            getInput.value = parseInt(getInput.value) + 1;
        } else {
            if(getInput.value > 0) {
                getInput.value = parseInt(getInput.value) - 1;
                checkInputsNull(getAllInputs, zero_count, 'all', function () {
                    callHook(getAllInputs, function (i) {
                        if(+getAllInputs[i].value === 0) {
                            getInput.value = 1;
                        }
                    });
                },function () {});
            }
        }
        if (+getInput.value === 0) {
            getQ.setAttribute('data-check', 'false');
            getQ.querySelector('div').style.opacity = '0.5';
        } else {
            getQ.setAttribute('data-check', 'true');
            getQ.querySelector('div').style.opacity = '1';
        }
    }
    // Add Checking Data Attr
    function addDataCheck(t, checkClass, ch) {
        var b = t;
        var getInput = ch ==='qty'?b.parentNode.parentNode.querySelector('input'):b;
        var getQ = ch ==='qty'?b.parentNode.parentNode.parentNode.parentNode.querySelector(checkClass):b.parentNode.parentNode.parentNode.querySelector(checkClass);
        if (parseInt(getInput.value) === 0 || getInput.value === '') {
            getQ.setAttribute('data-check', 'false');
        } else {
            getQ.setAttribute('data-check', 'true');
        }
    }
    // Focus Function
    function checkNullNewFocus(t,findClass,wrpCard) {
        var b = t;
        var numberPattern = new RegExp('^\\d*\\.?\\d+$');
        var getAllInputs = wrpCard.getElementsByTagName('input');
        var zero_count = 0;
        checkInputsNull(getAllInputs, zero_count, 'all', function () {
            callHook(getAllInputs, function (i) {
                if(+getAllInputs[i].value === 0) {b.value = 1;}
            });
            return false;
        }, function () {
            if(b.value.match(numberPattern)) {
                if (b.value === '' || parseInt(b.value) === parseInt(0)) {
                    b.parentNode.parentNode.parentNode.querySelector(findClass).style.opacity = '.5';
                    b.value = 0;
                    b.parentNode.parentNode.parentNode.querySelector('div').setAttribute('data-check', 'false');
                } else {
                    b.parentNode.parentNode.parentNode.querySelector(findClass).style.opacity = '1';
                    b.parentNode.parentNode.parentNode.querySelector('div').setAttribute('data-check', 'true');
                }
            } else {
                b.parentNode.parentNode.parentNode.querySelector(findClass).style.opacity = '1';
                b.value = 1;
                b.parentNode.parentNode.parentNode.querySelector('div').setAttribute('data-check', 'true');
            }
        });
    }
    // Pick Color And Image Function
    function pickColorAndImgs(t, elem, ev, getAllClicks) {
        var b = t;
        var getAllEls = getAll(elem);
        function classCtrl(nList, cl, thisClick) {
            callHook(nList, function (i) {nList[i].classList.remove(cl);});
            if(!thisClick.classList.contains(cl)) {thisClick.classList.add(cl);}
        }

        if(ev === 'color') {
            var getColorVal = b.dataset.color;
            callHook(getAllEls, function (i) {
                classCtrl(getAllClicks, 'active', b);
                getAllEls[i].setAttribute('fill', getColorVal);
            })
        }
        if(ev === 'pattern') {
            var getPatternVal = b.dataset.pattern;
            if(getPatternVal) {
                getXhr(''+ getPatternVal +'', function (data) {
                    var createElemEnt = createElem('div');
                    createElemEnt.innerHTML = data;
                    var getDAttr = createElemEnt.querySelector('path').getAttribute('d');
                    callHook(getAllEls, function (i) {
                        classCtrl(getAllClicks, 'active', b);
                        getAllEls[i].setAttribute('d', getDAttr);
                    })
                });
            } else {
                callHook(getAllEls, function (i) {
                    classCtrl(getAllClicks, 'active', b);
                    getAllEls[i].setAttribute('d', '');
                })
            }
        }
        if(ev === 'img') {
            var getImgVal =  b.dataset.img;
            getXhr(''+ getImgVal +'', function (data) {
                var createElemEnt = createElem('div');
                createElemEnt.innerHTML = data;
                callHook(getAllEls, function (i) {
                    classCtrl(getAllClicks, 'active', b);
                    getAllEls[i].innerHTML = '';
                    if(getAllEls[i].innerHTML === '') {
                        getAllEls[i].insertAdjacentHTML('beforeend', data);
                    }
                })
            });
        }
    }
    // Catch Text Function
    function catchText(t, output, c, check) {
        var b = t;
        var getAllOut = getAll(output);
        function checkFields(f, a, b) {f.value.length>0?a():b();}
        if (b.value.length <= 20) {
            callHook(getAllOut, function (i) {
                if (i === 0) {
                    if (check === 'top') {
                        checkFields(b, function () {
                            getSelector(c).innerHTML = b.value;
                            // arcText(getSelector(c), 127, 1); // Call Arc Text Function Top Direction
                        }, function () {
                            clearFS(b, getAllOut[i]);
                        });
                    } else {
                        checkFields(b, function () {
                            getSelector(c).innerHTML = b.value;
                            // arcText(getSelector(c), 127, -1); // Call Arc Text Function Bottom Direction
                        }, function () {
                            clearFS(b, getAllOut[i]);
                        });
                    }
                } else {
                    getAllOut[i].innerHTML = b.value;
                }
            })
        } else {b.value = b.value.substr(0, 20);}
    }
    // Clear All Stickers Function
    function clearFS(t, clearSection) {
        var b = t;
        var getLength = b.value.length;
        if (getLength <= 0) {clearSection.innerHTML = '';}
    }

    // Constructor Steps Switcher
    function switchContainers (t, refContainer, hideEls, wrapEl, cards, direction, priceWrapper) {
        var b = t;
        var getElements = refContainer.children[0];
        var createBtn = createElem('button', 't-addCartBtn t-btn');
        createBtn.setAttribute('disabled', 'true');
        createBtn.appendChild(createElem('span'));
        createBtn.querySelector('span').innerText = 'Добавить в корзину';
        function workRemove(elem, cl) {
            elem.classList.remove(cl);
            elem.style.display='none';
        }
        function workAdd(elem, cl) {
            elem.classList.add(cl);
            fadeInV(elem, 'block');
        }
        function goForward(element, getClass) {
            if(!element.classList.contains(getClass)) {
                workRemove(element.nextElementSibling, getClass);
                workAdd(element, getClass);
                fadeInV(b.previousElementSibling, 'block');
                callHook(hideEls, function (i) {
                    hideEls[i].style.display = 'none';
                });
                wrapEl.style.height = cards.clientHeight+'px';
            } else {
                workRemove(element, getClass);
                workAdd(element.nextElementSibling, getClass);
                b.style.display='none';
                insertAfter(createBtn,b);
                priceWrapper[0].style.opacity = 0;
                priceWrapper[1].querySelector('.t-constructorMainQuantity').textContent = priceWrapper[0].querySelector('.t-constructorMainQuantity').textContent;
                priceWrapper[1].querySelector('.t-constructorMainPrice').textContent = priceWrapper[0].querySelector('.t-constructorMainPrice').textContent;
            }
        }
        function goBack(element, getClass) {
            if(element.classList.contains(getClass)) {
                workRemove(element, getClass);
                b.style.display='none';
                callHook(hideEls, function (i) {
                    hideEls[i].style.display = 'block';
                });
                wrapEl.style.height = cards.clientHeight+'px';
            } else {
                workRemove(element.nextElementSibling, getClass);
                b.nextElementSibling.nextElementSibling.parentNode.removeChild(b.nextElementSibling.nextElementSibling);
                workAdd(element, getClass);
                fadeInV(b.nextElementSibling, 'block');
                priceWrapper[0].style.opacity = 1;
            }
        }
        if(direction === 'forward') {
            goForward(getElements, 'active');
        } else {
            goBack(getElements, 'active');
        }
    }
    // Constructor Steps Switcher End

    // Switch Category By Data Attributes

    function switchCategory(t, items) {
        var b = t;
        var getAllItems = getAll(items);
        if (b.dataset.value === 'all') {
            callHook(getAllItems, function (i) {
                getAllItems[i].style.display = 'flex';
            })
        } else {
            var elements = getAll(items+'[data-category="'+ b.dataset.value +'"]');
            callHook(getAllItems, function (i) {getAllItems[i].style.display = 'none';});
            callHook(elements, function (i) {elements[i].style.display = 'flex';});
        }
    }

    function PriceCounter(getItems) {
        this.pPrice = getItems.primaryPrice;
        this.tPrice = getItems.totalPrice;
        this.cardParent = getItems.findParent;
        this.priceSel = getItems.findPriceSelector;
        this.priceTSel = getItems.findTotalPriceSelector;
        this.inputClass = getItems.getInputClass;
        this.getAllMainTotalPrice = getItems.getAllMainTotalPrice;
        this.getAllInputs = getAll(getItems.getInputClass);
        this.getCountOfGoods = getItems.getCountOfGoods;
        this.init(this.pPrice, this.tPrice);
    }
    PriceCounter.prototype.init = function (pPrice, outPrice) {
        callHook(pPrice, function (i) {outPrice[i].textContent = pPrice[i].textContent;});
        this.priceInitCount();
    };
    PriceCounter.prototype.plusCall = function (data) {
        var getDefaultPrice = data.closest(this.cardParent).querySelector(this.priceSel).textContent;
        var getMultiplyValue = parseInt(getDefaultPrice) * parseInt(data.closest(this.cardParent).querySelector(this.inputClass).value);
        data.closest(this.cardParent).querySelector(this.priceTSel).textContent = getMultiplyValue;
        this.priceInitCount();
    };
    PriceCounter.prototype.minusCall = function (data) {
        if(parseInt(data.closest(this.cardParent).querySelector(this.inputClass).value) <= 0) {
            data.closest(this.cardParent).querySelector(this.priceTSel).textContent = 0;
            this.priceInitCount();
            return false;
        } else if (parseInt(data.closest(this.cardParent).querySelector(this.inputClass).value) <= 1) {
            data.closest(this.cardParent).querySelector(this.priceTSel).textContent = parseInt(data.closest(this.cardParent).querySelector(this.priceSel).textContent);
            this.priceInitCount();
            return false;
        }
        var getDefaultPrice = data.closest(this.cardParent).querySelector(this.priceSel).textContent;
        var getMultiplyValue = parseInt(data.closest(this.cardParent).querySelector(this.priceTSel).textContent) - parseInt(getDefaultPrice);
        data.closest(this.cardParent).querySelector(this.priceTSel).textContent = getMultiplyValue;
        this.priceInitCount();
    };
    PriceCounter.prototype.inputCtrl = function (data) {
        var getDefaultPrice = data.closest(this.cardParent).querySelector(this.priceSel).textContent;
        var getValueFromInput = parseInt(data.value) === isNaN(parseFloat(''))?0:parseInt(data.value);
        data.closest(this.cardParent).querySelector(this.priceTSel).textContent = getDefaultPrice * getValueFromInput;
        this.priceInitCount();
    };
    PriceCounter.prototype.priceInitCount = function () {
        var sum = 0;
        var secSum = 0;
        callHook(this.tPrice, function (i) {
            sum += +(this.tPrice[i].textContent);
        }.bind(this));
        callHook(this.getAllInputs, function (i) {
            secSum += +(this.getAllInputs[i].value);
        }.bind(this));
        this.getAllMainTotalPrice.textContent = sum;
        this.getCountOfGoods.textContent = secSum;
    };

    var getAllItemsForCounter = {
        primaryPrice: getAll('.t-constructorStickerCardPrice'),
        totalPrice: getAll('.t-constrictorStickerCardPriceTotal'),
        findParent: '.t-constructorStickerCardHolder',
        findPriceSelector: '.t-constructorStickerCardPrice',
        findTotalPriceSelector: '.t-constrictorStickerCardPriceTotal',
        getInputClass: '.t-constructorStickerCardQuantityVal',
        getAllMainTotalPrice: getSelector('.t-constructorMainPriceWrapper .t-constructorMainPrice'),
        getCountOfGoods: getSelector('.t-constructorMainQuantity')
};

    var priceCounter = new PriceCounter(getAllItemsForCounter);


    // Catch Font
    function FontSizeCtrl(item) {
        this.elem = item.textBreakPoint;
        this.textOne = item.textOne;
        this.textTwo = item.textTwo;
        this.allTextTags = item.allTextTags;
        this.inputFields = item.inputField;
        this.firstFieldCl = item.textFieldOne;
        this.secondFieldCl = item.textFieldTwo;
        this.elemWidth = parseInt(getComputedNotFix(this.elem).width, 10);
        this.maxFontSize = item.maxFontSize;
        this.maxValueLength = item.maxValLength;
        this.allOptions  = item.allOptions;
        this.checkClickClass = item.checkClickClass;
        this.stickerCardHolders = item.stickerCardHolders;
        this.stickerStyleTag = item.stickerStyleTag;
        this.hookMaxWidth = item.hookMaxWidth;
        this.init();
    }
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.init = function () {
        this.events();
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.calcCheckFont = function (elementLoopOperate, targetValL, whatEvent) {
        function keyCodeWatch(event) {
            var keys = {ctrlAndCmdKey: event.ctrlKey || event.metaKey, vKey: 86};
            var key = event.which || event.keyCode || event.charCode;
            return key === keys.vKey && keys.ctrlAndCmdKey;
        }
        Array.prototype.forEach.call(this.hookMaxWidth, function (data, i) {
            var getFontWidth = elementLoopOperate.getComputedTextLength();
            var getCurrentFontSize = parseInt(getComputedNotFix(elementLoopOperate).fontSize, 10);
            var multiplier = data.dataset.textbreakpoint/getFontWidth;
            var newSize = (getCurrentFontSize*(multiplier-.1));
            // elementLoopOperate.dataset.size Font size Hold In data-size attribute;
            // I set different font sizes by default use (for loop).
            if((data.dataset.textbreakpoint > 0 && newSize > elementLoopOperate.dataset.size)) {
                elementLoopOperate.style.fontSize = elementLoopOperate.dataset.size+'px';
                return false;
            } else {
                if(targetValL !== this.maxValueLength) {
                    elementLoopOperate.style.fontSize = Math.round(newSize)+'px';
                } else if (whatEvent) {
                    elementLoopOperate.style.fontSize = Math.round(newSize)+'px';
                } else  {
                    return false;
                }
            }
        }.bind(this));
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.checkFont = function (targetEl, classContains, targetValL, elementLoopOperate) {
        if(targetEl.parentNode.classList.contains(classContains)) {
            this.calcCheckFont(elementLoopOperate, targetValL);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.calcCall = function (targetEl, targetValL) {
        callHook(this.textOne, function (i) {
            this.checkFont(
                targetEl,
                this.firstFieldCl || this.checkClickClass,
                targetValL,
                this.textOne[i]
            );
        }.bind(this));
        //////////////////////////////////////////////////////////////////////////////////
        callHook(this.textTwo, function (i) {
            this.checkFont(
                targetEl,
                this.secondFieldCl || this.checkClickClass,
                targetValL,
                this.textTwo[i]
            );
        }.bind(this));
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.calculateClick = function (whatText, loopFields, targetDataEv) {
        Array.prototype.forEach.call(whatText, function (data, i) {
            this.calcCheckFont(data, loopFields.value.length, targetDataEv);
        }.bind(this));
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.clickEv = function (targetEl) {
        console.log(targetEl.dataset.value);
        callHook(this.stickerCardHolders, function (i) {
            if(this.stickerCardHolders[i].dataset.font !== targetEl.dataset.value) {
                this.stickerCardHolders[i].setAttribute('data-font', targetEl.dataset.value);
                Array.prototype.forEach.call(this.inputFields, function (data, i) {
                    if(data.parentNode.classList.contains(this.firstFieldCl)) {
                        this.calculateClick(this.textOne, data, targetEl.dataset.ev);
                    }
                    if(data.parentNode.classList.contains(this.secondFieldCl)) {
                        this.calculateClick(this.textTwo, data, targetEl.dataset.ev);
                    }
                }.bind(this));
                
            } else {
                return false;
            }
        }.bind(this));
        //////////////////////////////////////////////////////////////////////////////////
        callHook(this.stickerStyleTag, function (i) {
            Fonts.setFontController(this.stickerStyleTag[i], targetEl.dataset.value, targetEl.dataset.url);
        }.bind(this));
        //////////////////////////////////////////////////////////////////////////////////
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.input = function (ev) {
        this.calcCall(ev.target, ev.target.value.length);
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.clickCall = function (ev) {
        this.clickEv(ev.target);
    };
    FontSizeCtrl.prototype.cutClipBoard = function (ev) {
        var paste = ev.clipboardData.getData('text');
        if(paste.length >= 20) {ev.preventDefault();}
        if(ev.target.parentNode.classList.contains(this.firstFieldCl)) {
            if(ev.target.value.length >= 15 && paste.length <= 5) {
                ev.preventDefault();
            }
        }
        if(ev.target.parentNode.classList.contains(this.secondFieldCl)) {
            if(ev.target.value.length >= 15 && paste.length <= 5) {
                ev.preventDefault();
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////
    FontSizeCtrl.prototype.events = function () {
        callHook(this.inputFields, function (i) {
            this.inputFields[i].addEventListener('input', this.input.bind(this));
            this.inputFields[i].addEventListener('paste', this.cutClipBoard.bind(this));
        }.bind(this));
        //////////////////////////////////////////////////////////////////////////////////
        callHook(this.allOptions, function (i) {
            this.allOptions[i].addEventListener('click', this.clickCall.bind(this))
        }.bind(this));
    };

    var FontSizeCtrlVariables = {
        textBreakPoint: getSelector('.t-textBreakPoint'),
        textOne: getAll('.t-constructorStickerCardHolder .textSvgOne'),
        textTwo: getAll('.t-constructorStickerCardHolder .textSvgTwo'),
        inputField: getAll('.t-inputItem input'),
        textFieldOne: 't-constructorFirstTextField',
        textFieldTwo: 't-constructorSecondTextField',
        allOptions: getAll('.t-options'),
        checkClickClass: 't-options',
        stickerCardHolders: getAll('.t-constructorStickerCardHolder'),
        stickerStyleTag: getAll('.t-constructorStickerCard svg defs style'),
        allTextTags: getAll('.svgSticker text'),
        hookMaxWidth: getAll('.t-constructorStickerCardHolder svg'),
        maxValLength: 20
    };


    // StickerPreview
    function StickerPreview(items) {
        this.svgs = items.getAllSvg;
        this.getWr = items.getWr;
        this.rightOffset = items.rightOffset;
        this.init();
    }
    StickerPreview.prototype.init = function () {this.events();};
    StickerPreview.prototype.enter = function (ev) {
        var target = ev.currentTarget;
        var crtContainer = createElem('div', 't-cloneSticker');
        var clone = target.children[0].cloneNode(true);
        clone.setAttribute('width', target.children[0].dataset.width);
        clone.setAttribute('height', target.children[0].dataset.height);
        crtContainer.appendChild(clone);
        this.getWr.appendChild(crtContainer);
    };
    StickerPreview.prototype.leave = function (ev) {
        this.clone = getSelector('.t-cloneSticker');
        if(this.clone) {this.clone.parentNode.removeChild(this.clone);}
    };
    StickerPreview.prototype.move = function (ev) {
        this.clone = getSelector('.t-cloneSticker');
        var calcData = {windowWidth: window.innerWidth, blockWidth: this.clone.offsetWidth};
        var x = ev.pageX, y = ev.pageY;
        var odds = (x + calcData.blockWidth) - calcData.windowWidth + this.rightOffset;
        if(calcData.windowWidth < x + calcData.blockWidth) {
            this.clone.style.transform = 'translate3d('+ (x - odds) + 'px, '+ y +'px ,0)';
        } else {
            this.clone.style.transform = 'translate3d('+ x + 'px, '+ y +'px ,0)';
        }
    };
    StickerPreview.prototype.events = function () {
        Array.prototype.forEach.call(this.svgs, function (data, i) {
            data.addEventListener('mouseenter', this.enter.bind(this));
            data.addEventListener('mouseleave', this.leave.bind(this));
            data.addEventListener('mousemove', this.move.bind(this));
        }.bind(this));
    };

    var stickerPreviewVariables = {
        getAllSvg: getAll('.t-constructorStickerCard'),
        getWr: getSelector('.wrapper'),
        rightOffset: 20
    };

    if(!device.mobile() || window.innerWidth > 767) {new StickerPreview(stickerPreviewVariables);}





    function destroyConstructor() {
        var defaultColor = '#50BCFF';
        var defaultIcon = '';
        var stickerCard = getAll('.t-constructorStickerCard');
        var getQuantity = getAll('.t-constructorStickerCardQuantityWr input');
        var stickerText = getAll('.t-constructorStickerCard svg .textSvgTwo, .t-constructorStickerCard svg .textSvgOne');
        var setDataCheck = getAll('.t-constructorStickerCardHTop');
        var getIconHolder = getAll('.t-constructorStickerCard .t-groupIconHolder');
        var getTextInputs = getAll('.t-constructorMainTextEditCard input');
        var getListOptions = getAll('.t-constructorMainWrappper .t-listOptions');
        var getPad = getAll('.t-padColor');
        var getAllLiTagsInConstructor = getAll('.t-constructorDefaultPicker li');
        var fontData = getAll('.t-constructorStickerCardHolder');
        var getAllSelectLists = getAll('.t-constructorMainWrappper .t-customOptionsWrapper');
        var getSettingsContainer = getSelector('.t-constructorMainStickersSettingsWrapper').children;
        var buttonsHolder = getSelector('.t-constructorMainStickersButtonsWrapper').children;
        var getCardSelectorWrapper = getSelector('.t-constructorMainStickersPreviewWrapperContainer');
        callHook(getQuantity, function (i) {getQuantity[i].value = '1';});
        callHook(stickerText, function (i) {stickerText[i].innerHTML = '';});
        callHook(setDataCheck, function (i) {setDataCheck[i].setAttribute('data-check', 'true')});
        callHook(stickerCard, function (i) {stickerCard[i].style.opacity = '1';});
        callHook(getIconHolder, function (i) {getIconHolder[i].innerHTML = ''});
        callHook(getTextInputs, function (i) {getTextInputs[i].value = ''});
        callHook(getListOptions, function (i) {getListOptions[i].style.display = 'none'});
        callHook(getPad, function (i) {getPad[i].setAttribute('fill', defaultColor)});
        callHook(fontData, function (i) {fontData[i].removeAttribute('data-font')});
        callHook(getAllLiTagsInConstructor, function (i) {
            getAllLiTagsInConstructor[i].classList.remove('active');
            getAllLiTagsInConstructor[i].style.display='flex';
        });
        callHook(getAllSelectLists, function (i) {
            var getFirstOptions = getAllSelectLists[i].querySelector('.t-options');
            var findStyledSelectBox = getAllSelectLists[i].querySelector('.t-styledSelectorBox');
            var findOriginalSelect = getAllSelectLists[i].querySelector('select');
            findOriginalSelect.value = getFirstOptions.dataset.value;
            findStyledSelectBox.innerText = getFirstOptions.innerText;
        });
        callHook(getSettingsContainer, function (i) {
            if(getSettingsContainer[i].classList.contains('active')) {
                getSettingsContainer[i].classList.remove('active');
                getSettingsContainer[i].style.display='none';
            }
        });
        callHook(buttonsHolder, function (i) {
            if (buttonsHolder[i].matches('.t-addCartBtn')){getSelector('.t-addCartBtn').parentNode.removeChild(getSelector('.t-addCartBtn'));}
            getSelector('.t-constructorNextButton').style.display='block';
            getSelector('.t-constructorPrevButton').style.display='none';
        });
        callHook(getAll('.t-hideCtrlEl'), function (i) {
            getAll('.t-hideCtrlEl')[i].style.display = 'block';
        });
        callHook(getAll('.t-constrictorStickerCardPriceTotal'), function (i) {
            getAll('.t-constrictorStickerCardPriceTotal')[i].textContent = getAll('.t-constructorStickerCardPrice')[i].textContent;
        });
        fadeOutV(getSelector('.t-constructorSuperMainWrapper'));
        getSelector('.t-constructorSuperMainWrapper').classList.remove('t-constructorActive');
        fadeOutV(getSelector('.t-overlay'));
        getCardSelectorWrapper.style.height = 311+'px';
        document.body.style.overflow = 'auto';

    }

    // Constructor Variables
    var getListOptions = getAll('.t-inputItem .t-listOptions li');
    var getButtons = getAll('.t-constructorStickerCardQuantityBtn');
    var getColorPick = getAll('.t-constructorMainColorPicker li');
    var getImgPick = getAll('.t-constructorMainImgPicker li');
    var getPatternPick = getAll('.t-constructorMainPatternPicker li');
    var getQWrapper = getAll('.t-constructorStickerCardQuantityWr input');
    var getFirstField = getSelector('.t-constructorFirstTextField input');
    var getSecondField = getSelector('.t-constructorSecondTextField input');
    var getNextButton = getSelector('.t-constructorNextButton');
    var getPrevButton = getSelector('.t-constructorPrevButton');
    var getSettingsWrapper = getSelector('.t-constructorMainStickersSettingsWrapper');
    var getCardContainer = document.getElementById('t-constructorMainStickersPreview');
    var getConstructorImages = getAll('.t-constructorImgPickerCategory .t-customOptionsWrapper .t-options');
    var getCloseBtn = getSelector('.t-closeConstructor');
    var getCreateStickerButton = getAll('.t-createStickerButton');

    // All Constructor Events
    getNextButton.addEventListener('click', function () {
        switchContainers(this,
            getSettingsWrapper,
            getAll('.t-hideCtrlEl'),
            getSelector('.t-constructorMainStickersPreviewWrapperContainer'),
            getSelector('.t-constructorStickerCardHolder'),
            'forward',
            getAll('.t-constructorMainPriceWrapper')
        );
    }, false);
    getPrevButton.addEventListener('click', function () {
        switchContainers(this,
            getSettingsWrapper,
            getAll('.t-hideCtrlEl'),
            getSelector('.t-constructorMainStickersPreviewWrapperContainer'),
            getSelector('.t-constructorStickerCardHolder'),
            '',
            getAll('.t-constructorMainPriceWrapper')
        );
    }, false);

    // callHook(getListOptions, function (i) {
    //     getListOptions[i].addEventListener('click', function (e) {
    //         catchFont(this, '.t-constructorStickerCardHolder', '.t-constructorStickerCard svg defs style', '.svgSticker text');
    //     }, false);
    // });
    callHook(getButtons, function (i) {
        getButtons[i].addEventListener('click', function (e) {
            var check = 't-plus'?'t-plus':'t-minus';
            mainCheckZeroFunction(this, check, getCardContainer);
            if (e.target.classList.contains('t-plus')) {
                priceCounter.plusCall(this);
            } else if (e.target.classList.contains('t-minus')) {
                priceCounter.minusCall(this);
            }
        }, false);
    });
    callHook(getColorPick, function (i) {
        getColorPick[i].addEventListener('click', function () {
            pickColorAndImgs(this, '.t-constructorStickerCard .t-padColor', 'color', getColorPick);
        },false)
    });
    callHook(getImgPick, function (i) {
        getImgPick[i].addEventListener('click', function () {
            pickColorAndImgs(this, '.t-constructorStickerCard .t-groupIconHolder', 'img' , getImgPick);
        },false)
    });
    callHook(getPatternPick, function (i) {
        callEvent(getPatternPick[i], 'click', function (event, data) {
            pickColorAndImgs(data, '.t-constructorStickerCard .t-pattern', 'pattern' , getPatternPick)
        }) 
    });

    getFirstField.addEventListener('input', function () {
        clearFS(this, '.svgSticker .textSvgOne, .svgStickerOne .textSvgOne');
        catchText(this, '.svgSticker .textSvgOne', '.svgStickerOne .textSvgOne', 'top')
    }, false);
    getSecondField.addEventListener('input', function () {
        clearFS(this, '.svgSticker .textSvgTwo, .svgStickerOne .textSvgTwo');
        catchText(this, '.svgSticker .textSvgTwo', '.svgStickerOne .textSvgTwo');
    }, false);
    callHook(getQWrapper, function (i) {
        getQWrapper[i].addEventListener('input', function () {
            checkNullNewFocus(this, '.t-constructorStickerCard', getCardContainer);
            addDataCheck(this, '.t-constructorStickerCardHTop', 'qty');
            priceCounter.inputCtrl(this);
        });
    });
    callHook(getConstructorImages, function (i) {
        getConstructorImages[i].addEventListener('click', function (e) {
            switchCategory(this, '.t-constructorMainImgPicker li');
        }, false);
    });
    getCloseBtn.addEventListener('click', function () {
        destroyConstructor();
    }, false);

    callEvent(null, 'resize', function (event, data) {
        if(getSelector('.t-constructorSuperMainWrapper').classList.contains('t-constructorActive')) {
            if(!device.mobile() || window.innerWidth > 767) {
                new CallScrollMouseWheel('.t-constructorMainStickersPreviewWrapperContainer', '.t-constructorStickerCardHolder', '.t-constructorSuperMainWrapper', '.t-progressBarWrapper');
            }
        }
    });

    callHook(getCreateStickerButton, function (i) {
        getCreateStickerButton[i].addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.body.style.overflow = 'hidden';
            fadeInV(getSelector('.t-overlay'), 'block');
            fadeInV(getSelector('.t-constructorSuperMainWrapper'), 'block');
            getSelector('.t-constructorSuperMainWrapper').classList.add('t-constructorActive');
            new FontSizeCtrl(FontSizeCtrlVariables);
            if(!device.mobile() || window.innerWidth > 767) {
                new CallScrollMouseWheel('.t-constructorMainStickersPreviewWrapperContainer', '.t-constructorStickerCardHolder', '.t-constructorSuperMainWrapper', '.t-progressBarWrapper');
            }
        }, false);
    });


    // All Constructor Events End


    var getCartIcon = getAll('.svgSticker');
    function test(element) {
        function utoa(str) {return window.btoa(unescape(encodeURIComponent(str)));}
        var s = new XMLSerializer().serializeToString(element);
        var encodedData = utoa(s);
        console.log('data:image/svg+xml;base64,' + encodedData);
    }

    getPrevButton.addEventListener('click', function (e) {
        callHook(getCartIcon, function (i) {
           test(getCartIcon[i]);
        });
    }, false);

    var Fonts = {
        fontController: function (fontName, url) {
            var theSetup = '@font-face {font-family: '+ fontName +'; src: url("'+ url +'");}';
            return theSetup;
        },
        setFontController: function (el, fontName, url) {
            el.textContent = this.fontController(fontName, url);
        }
    };

});


// Constructor End

if(device.mobile() || window.innerWidth < 768) {
    var getListNavItems = getAll('.t-headerNavigation .t-navItem');
    callHook(getListNavItems, function (i) {
        callEvent(getListNavItems[i], 'click', function (event, data) {
            toggleThis(getSelector('.t-headerNavigation'), 't-showMobileMenu');
            fadeOutV(getSelector('.t-overlay'));
        })
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on('load', function () {
    var arrSelectors = ['.t-jumbotronWrapperSection', '.t-benefits', '.t-answerAndQuestion', '.t-contactsAndFeedBack', 'footer'];
    $('html, body').animate({scrollTop:0}, 10);
    $('body').removeClass('t-animeOne');
    $('.t-astronaut').removeClass('t-blockHidden');
    $('.t-figureContainer').removeClass('t-blockHidden');
    $('.t-loadingLogo').removeClass('t-blockHidden');
    setTimeout(function () {
        $('.background').removeClass('topBackground');
    },1900);
    setTimeout(function () {
        $('.t-jumboWrapper').removeClass('t-blockHidden');
        $('.t-jumboWrapper').addClass('t-showThis');
    },2000);
    setTimeout(function () {
        holdFunc(getAll(arrSelectors), 't-showElement');
        $('.t-jumboInfoHeader, .t-jumboInfoFooter').removeClass('t-blockHidden');
    },2100);
    setTimeout(function () {
        $('.t-jumboInfoBody').removeClass('t-blockHidden');
    },2300);
    setTimeout(function () {
        $('body').removeClass('t-windowLoading');
        $('body').removeClass('fixed');
    },3100);
    setTimeout(function () {
        $('header').removeClass('t-blockHidden');
    },3200);
    setTimeout(function () {
        $('.background').removeClass('animation');
    },5900);

    // var getFrame = document.querySelector('.t-frame');
    // function randomVa() {
    //    var num = Math.random() * 12;
    //     getFrame.style.borderRadius = num + 'px';
    // }
    // function randomFrame() {
    //     var getFrame = document.querySelector('.t-frame');
    //     var offsetLeft = Math.random() * (window.innerWidth - getFrame.clientWidth);
    //     // random num for top offset
    //     var offsetTop = Math.random() * (window.innerHeight - getFrame.clientHeight);
    //
    //     console.log(offsetLeft, offsetTop);
    //
    //     getFrame.style.left = offsetLeft + 'px';
    //     getFrame.style.top = offsetTop + 'px';
    //     getFrame.style.transform = 'rotate('+ offsetTop +'deg)';
    //     getFrame.style.transform = 'skew('+ offsetTop +'deg, '+ offsetLeft+'deg)';
    //     getFrame.style.borderRadius = offsetTop + 'px';
    // }
    // randomFrame();
    // setInterval(function () {
    //     randomVa();
    // },3000)


    // Accordeon

    var getAccordBtn = $('.t-openAccordItem');
    var getAccordContent = $('.t-accordItemContent');

    $('body').on('click', '.t-openAccordItem', function () {
        if($('body').hasClass('animate')){
            return false;
        }
        $('body').addClass('animate');
        if ($(this).parent().hasClass('isActive')){
            $(this).next(getAccordContent).slideUp(400);
            $(this).parent().removeClass('isActive');
        } else {
            $(getAccordBtn).not(this).next(getAccordContent).slideUp(400);
            $(getAccordBtn).not(this).parent().removeClass('isActive');

            $(this).next(getAccordContent).slideDown(400);
            $(this).parent().addClass('isActive');
        }
        setTimeout(function () {
            $('body').removeClass('animate');
        }, 400);
    });

});


// Cart Ctrl

$(function () {
   $('.t-addToCart').on('click', function () {
      $(this).each(function () {
          var getNameGoods = $(this).closest('.t-GoodsCardMain').find('.t-goodsNameMain').html();
          var getImgGoods = $(this).closest('.t-GoodsCardMain').find('.t-goodsImgMain').attr('src');
          var getPriceGoods = $(this).closest('.t-GoodsCardMain').find('.t-goodsPriceMain').html();
          var smallCartItem = '<li class="t-smallCartItem">' +
                                  '<div class="t-smallCartItemImg"><img src="'+ getImgGoods +'"></div>' +
                                  '<div class="t-smallCartItemPriceAndName">' +
                                        '<h4 class="t-smallCartItemName">'+ getNameGoods +'</h4>' +
                                        '<span class="t-smallCartPrice">'+ getPriceGoods +'</span>' +
                                  '</div>' +
                              '</li>';
          $('.t-smallCartBody').append(smallCartItem);
          console.log(getNameGoods, getImgGoods, getPriceGoods)
      });
      if($('.t-smallCartItem').length > 0) {
          var getCartBodyLe = $('.t-smallCartItem').length;
          $('.t-smallCartBody').addClass('t-smallCartBodyActive');
          $('.t-smallCartTitleInfo').text('Товаров - '+ getCartBodyLe);
          $('.t-smallCartTotalPrice').addClass('activeTotal');
          $('.t-smallCartBtnInfo').attr('href', '/cart.html');
          $('.t-smallCartBtnInfo span').text('Перейти в корзину');
          $('.t-smallCartOpen').addClass('t-hasGoodsInCart');
      } else {
          $('.t-smallCartOpen').removeClass('t-hasGoodsInCart');
      }
      var totalPriceCount = 0;
      $('.t-smallCartPrice').each(function () {
          var eachPrice = parseInt($(this).text());
          totalPriceCount+= eachPrice;
      });
      $('.t-smallCartTotalPrice').text(addSpace(totalPriceCount + ' ' + '₽'));
   });
});
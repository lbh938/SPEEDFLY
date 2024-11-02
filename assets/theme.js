!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});

!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);

/* Run function after window resize */
var afterResize=(function(){var t={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId="Don't call this twice without a uniqueId";}if(t[uniqueId]){clearTimeout(t[uniqueId]);}t[uniqueId]=setTimeout(callback,ms);};})();

//* Ajaxify.js.liquid *//



/* ================ SLATE ================ */ 
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
  .on('shopify:section:load', this._onSectionLoad.bind(this))
  .on('shopify:section:unload', this._onSectionUnload.bind(this))
  .on('shopify:section:select', this._onSelect.bind(this))
  .on('shopify:section:deselect', this._onDeselect.bind(this))
  .on('shopify:block:select', this._onBlockSelect.bind(this))
  .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/* ================ MODULES ================ */
/* eslint-disable no-new */
window.timber = window.timber || {};

timber.cacheSelectors = function () {
  timber.cache = {
    // General
    $html: $('html'),
    $body: $('body'),
    $breadcrumbs: $('.breadcrumb'),

    // Navigation
    $navigation: $('#accessibleNav'),
    $hasDropdownItem: $('.site-nav--has-dropdown'),
    $menuToggle: $('.menu-toggle'),

    // Product Page
    
    $productImageWrap: $('#productPhoto'),
    $productImage: $('#productPhotoImg'),
    $thumbImages: $('#productThumbs').find('a.product-photo-thumb'),
    $shareButtons: $('.social-sharing'),

    // Collection Pages
    $collectionFilters: $('#collectionFilters'),
    $advancedFilters: $('.advanced-filters'),
    $toggleFilterBtn: $('#toggleFilters'),

    // Cart Pages
    $emptyCart: $('#EmptyCart'),
    $ajaxCartContainer: $('#ajaxifyCart'),
    cartNoCookies: 'cart--no-cookies',

    // Equal height elements
    $featuredContainer: $('.featured-box').closest('.grid-uniform'),
    $productGridImages: $('.product-grid-image')
  };
};

timber.cacheVariables = function () {
  timber.vars = {
    // Breakpoints (from timber.scss.liquid)
    bpLarge: 769,

    // MediaQueries (from timber.scss.liquid)
    mediaQueryLarge     : 'screen and (min-width: 769px)',
    isLargeBp : false,
    isTouch: timber.cache.$html.hasClass('supports-touch')
  }
};

timber.init = function () {
  FastClick.attach(document.body);
  timber.cacheSelectors();
  timber.cacheVariables();

  timber.cache.$html.removeClass('no-js').addClass('js');
  if ('ontouchstart' in window) {
    timber.cache.$html.removeClass('no-touch').addClass('touch');
  }

  timber.initCart();
  timber.equalHeights();
  timber.responsiveVideos();
  timber.toggleFilters();


  
};

timber.accessibleNav = function () {
  var $nav = timber.cache.$navigation,
      $allLinks = $nav.find('a'),
      $topLevel = $nav.children('li').find('a'),
      $parents = $nav.find('.site-nav--has-dropdown'),
      $subMenuLinks = $nav.find('.site-nav--dropdown').find('a'),
      activeClass = 'nav-hover',
      focusClass = 'nav-focus';

  // Mouseenter
  $parents.on('mouseenter', function(evt) {
    var el = $(this);

    if (!el.hasClass(activeClass)) {
      evt.preventDefault();
    }

    showDropdown($(this));
  });

  $parents.on('mouseleave', function() {
    hideDropdown($(this));
  });

  $subMenuLinks.on('click', function(evt) {
    // Prevent touchstart on body from firing instead of link
    evt.stopImmediatePropagation();
  });

  $allLinks.focus(function() {
    handleFocus($(this));
  });

  $allLinks.blur(function() {
    removeFocus($topLevel);
  });

  // accessibleNav private methods
  function handleFocus (el) {
    var $subMenu = el.next('ul'),
        hasSubMenu = $subMenu.hasClass('site-nav--dropdown') ? true : false,
        isSubItem = $('.site-nav--dropdown').has(el).length,
        $newFocus = null;

    // Add focus class for top level items, or keep menu shown
    if ( !isSubItem ) {
      removeFocus($topLevel);
      addFocus(el);
    } else {
      $newFocus = el.closest('.site-nav--has-dropdown').find('a');
      addFocus($newFocus);
    }
  }

  function showDropdown (el) {
    el.addClass(activeClass);

    setTimeout(function() {
      timber.cache.$body.on('touchstart', function() {
        hideDropdown(el);
      });
    }, 250);
  }

  function hideDropdown ($el) {
    $el.removeClass(activeClass);
    timber.cache.$body.off('touchstart');
  }

  function addFocus ($el) {
    $el.addClass(focusClass);
  }

  function removeFocus ($el) {
    $el.removeClass(focusClass);
  }
};

timber.responsiveNav = function () {
  $(window).resize(function () {
    afterResize(function(){
      // Replace original nav items and remove more link
      timber.cache.$navigation.append($('#moreMenu--list').html());
      $('#moreMenu').remove();
      timber.alignMenu();
      timber.accessibleNav();
    }, 200, 'uniqueID');
  });
  timber.alignMenu();
  timber.accessibleNav();
};

timber.alignMenu = function () {
  var $nav = timber.cache.$navigation,
      w = -5,
      i = 0;
  wrapperWidth = $nav.outerWidth() - 101,
    menuhtml = '';

  if ( window.innerWidth < timber.vars.bpLarge ) {
    return;
  }

  $.each($nav.children(), function () {
    var $el = $(this);

    // Ignore hidden customer links (for mobile)
    if (!$el.hasClass('large-hide')) {
      w += $el.outerWidth(true);
    }

    if (wrapperWidth == w) {
      menuhtml += $('<div>').append($el.clone()).html();
      $el.remove();

      // Ignore hidden customer links (for mobile)
      if (!$el.hasClass('large-hide')) {
        i++;
      }
    }
  });

  if (wrapperWidth == w) {
    $nav.append(
      '<li id="moreMenu" class="site-nav--has-dropdown">'
      + '<a href="#">' + theme.strings.navigation.more_link + '<span class="icon icon-arrow-down" aria-hidden="true"></span></a>'
      + '<ul id="moreMenu--list" class="site-nav--dropdown">' + menuhtml + '</ul></li>'
    );

    if (i <= 1) {
      // Bail, and replace original nav items
      timber.cache.$navigation.append($('#moreMenu--list').html());
      $('#moreMenu').remove();
    }
  }
};

timber.toggleMenu = function () {
  var $doc = $(document);
  var showDropdownClass = 'show-dropdown';
  var showNavClass = 'show-nav';

  timber.cache.$menuToggle.on('click', function() {
    timber.cache.$html.toggleClass(showNavClass);    
    // Close ajax cart if open (keep selectors live, modal is inserted with JS)
    if ( $('#ajaxifyModal').hasClass('is-visible') ) {
      $('#ajaxifyModal').removeClass('is-visible');
      timber.cache.$html.addClass(showNavClass);
    }
  });

  // Open sub navs on small screens
  timber.cache.$hasDropdownItem.on('click', function(evt) {
    var $el = $(this);

    if (!$el.hasClass(showDropdownClass) && timber.vars.isTouch || !$el.hasClass(showDropdownClass) && timber.cache.$html.hasClass(showNavClass)) {
      evt.preventDefault();
      $el.addClass(showDropdownClass);
      $doc.on('click', handleClickOutsideDropdown);
    }

    function handleClickOutsideDropdown (evt) {
      var $target = $(evt.target);

      if (!$target.is($el) && !$.contains($el[0], $target[0])) {
        $el.removeClass(showDropdownClass);
        $doc.off('click', handleClickOutsideDropdown)
      }
    }
  })
};

timber.initCart = function() {
  if (!timber.cookiesEnabled()) {
    timber.cache.$emptyCart.addClass(timber.cache.cartNoCookies);
    timber.cache.$ajaxCartContainer.addClass(timber.cache.cartNoCookies);
  }
};

timber.cookiesEnabled = function() {
  var cookieEnabled = navigator.cookieEnabled;

  if (!cookieEnabled){
    document.cookie = 'testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
  }
  return cookieEnabled;
};

timber.equalHeights = function () {
  var $featuredBoxImageArray = [];
  var $featuredBoxArray = [];

  timber.cache.$featuredContainer.each(function() {
    $featuredBoxImageArray.push($(this).find('.featured-box--image'));
    $featuredBoxArray.push($(this).find('.featured-box'));
  });

  $(window).load(function() {
    resizeElements();
  });

  $(window).resize(function() {
    afterResize(function() {
      resizeElements();
    }, 250, 'id');
  });

  function resizeElements() {
    var featuredContainerLength = timber.cache.$featuredContainer.length;
    for (var i = 0; i < featuredContainerLength ; i++) {
      $featuredBoxImageArray[i].css('height', 'auto').equalHeights();
      $featuredBoxArray[i].css('height','auto').equalHeights();
    }
    timber.cache.$productGridImages.css('height', 'auto').equalHeights();
  }
};

timber.responsiveVideos = function () {
  var $iframeVideo = $('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]');
  var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');

  $iframeVideo.each(function () {
    // Add wrapper to make video responsive but not for video sections
    if(!$(this).parent('div.video-wrapper').length) {
      $(this).wrap('<div class="video-wrapper"></div>');
    };
  });

  $iframeReset.each(function () {
    // Re-set the src attribute on each iframe after page load
    // for Chrome's "incorrect iFrame content on 'back'" bug.
    // https://code.google.com/p/chromium/issues/detail?id=395791
    // Need to specifically target video and admin bar
    this.src = this.src;
  });
};

timber.toggleFilters = function () {
  if ( timber.cache.$collectionFilters.length ) {
    timber.cache.$toggleFilterBtn.on('click', function() {
      timber.cache.$toggleFilterBtn.toggleClass('is-active');
      timber.cache.$collectionFilters.slideToggle(200);

      // Scroll to top of filters if user is down the page a bit
      if ( $(window).scrollTop() > timber.cache.$breadcrumbs.offset().top ) {
        $('html, body').animate({
          scrollTop: timber.cache.$breadcrumbs.offset().top
        });
      }
    });
  }
};

timber.sortFilters = function () {
  timber.cache.$advancedFilters.each(function () {
    var $el = $(this),
        $tags = $el.find('li'),
        aNumber = /\d+/,
        sorted = false;
    $tags.sort(function (a, b) {
      a = parseInt( aNumber.exec( $(a).text() ), 10 );
      b = parseInt( aNumber.exec( $(b).text() ), 10 );
      if ( isNaN(a)  || isNaN(b) ) {
        return;
      }
      else {
        sorted = true;
        return a - b;
      }
    });
    if (sorted) {
      $el.append($tags);
    }
  });
};

timber.formatMoney = function (val) {

  

      
      if (moneyFormat.indexOf('money') === -1) {
        if ( (moneyFormat.indexOf('{{amount}}') > -1) && (moneyFormat.indexOf('.') === -1) ) {
          val = val.replace('.','<sup>') + '</sup>';
        }
        else if ( (moneyFormat.indexOf('{{ amount }}') > -1) && (moneyFormat.indexOf('.') === -1) ) {
          val = val.replace('.','<sup>') + '</sup>';
        }
        else if (moneyFormat.indexOf('{{ amount_with_comma_separator }}') > -1) {
          val = val.replace(',','<sup>') + '</sup>';
        }
        else if (moneyFormat.indexOf('{{amount_with_comma_separator}}') > -1) {
          val = val.replace(',','<sup>') + '</sup>';
        }
      }
  

  return val;
};

timber.formatSaleTag = function (val) {
  // If not using multiple currencies
  if (moneyFormat.indexOf('money') === -1) {
    // If we use amount
    if ( (moneyFormat.indexOf('{{amount}}') > -1) && (moneyFormat.indexOf('.') === -1) ) {
      // If there are no cents or money amount is more than 10, remove decimals
      if ( (val.indexOf('.00') > -1) || parseInt(val.replace(/[^0-9]/g, ''), 10) > 1000 ) {
        return val.split('.')[0];
      }
    }
    // If we use amount_with_comma_separator
    else if (moneyFormat.indexOf('{{amount_with_comma_separator}}') > -1) {
      // If there are no cents or money amount is more than 10, remove decimals
      if ( (val.indexOf(',00') > -1) || parseInt(val.replace(/[^0-9]/g, ''), 10) > 1000 ) {
        return val.split(',')[0];
      }
    }
  }
  return val;
};

// bxslider

if($('body').hasClass('template-index')) {

}

else {   
  timber.productPage = function (options) {
    var moneyFormat = options.money_format,
        variant = options.variant,
        selector = options.selector,
        product_id = options.product_id;

    var $productImage = $('#AddToCartForm--'+product_id+' #ProductPhotoImg'),
        $addToCart = $('#AddToCartForm--'+product_id+' #AddToCart'),
        $productPrice = $('#AddToCartForm--'+product_id+' #ProductPrice'),
        $comparePrice = $('#AddToCartForm--'+product_id+' #ComparePrice'),
        $comparePriceClass = $('#AddToCartForm--'+product_id+' .ComparePrice'),
        $youSave = $('#AddToCartForm--'+product_id+' #YouSave'),
        $quantityElements = $('#AddToCartForm--'+product_id+' .quantity-selector, #AddToCartForm--'+product_id+' .js-qty'),
        $addToCartText = $('#AddToCartForm--'+product_id+' #AddToCartText');
    $addToCartTextPopup = $('#quick-view #AddToCartForm--'+product_id+' #AddToCartText');
    $addToCartTextProduct = $('.template-product #AddToCartForm--'+product_id+' #AddToCartText');

    if (variant) {
      if (variant.featured_image) {
        var newImg = variant.featured_image,
            el = $productImage[0],
            variant_id = variant.id;
        var variant_img = $('#productSelect--'+product_id).find('option[value="'+variant_id+'"]').data('image');
        $("#bx-pager-"+product_id).find('img[data-ver="'+variant_img+'"]').parent("a").trigger('click');

        setTimeout(function(){
          var li = $("#bx-pager-"+product_id).find('img[data-ver="'+variant_img+'"]').parent("a").parent('li');
          var clickindex = $("#bx-pager-"+product_id+" li").index(li);
          if($("#bx-pager-"+product_id).find('img[data-ver="'+variant_img+'"]').parent("a").hasClass('active') && !$(li).parent('ul').parent('div').parent('div').children('.bx-controls').find('a[data-slide-index="'+clickindex+'"]').hasClass('active')){
            if($(li).is(':last-child') && !$(li).parent('ul').parent('div').parent('div').children('.bx-controls').find('a[data-slide-index="'+clickindex+'"]').hasClass('active')){
              $(li).parent('ul').parent('div').parent('div').children('.bx-controls').children('.bx-pager').children().last().children('a').trigger('click');
            } else {
              $(li).parent('ul').parent('div').parent('div').children('.bx-controls').find('a[data-slide-index="'+clickindex+'"]').trigger('click');
            }
          }
        }, 100);
      }

      $productPrice.html("<span class='money'>" + Shopify.formatMoney(variant.price, moneyFormat) + "</span>");
      if (variant.available) {
        $addToCart.removeClass('disabled').prop('disabled', false);
        
        $addToCartText.html('');
                            
        
                                 

                                 if (variant.compare_at_price > variant.price) {
          $comparePrice.html("<span class='money'>" + Shopify.formatMoney(variant.compare_at_price, moneyFormat) + "</span>").show();
          $comparePriceClass.show();
          
                        } else {
                        $comparePrice.hide();
          $comparePriceClass.hide();
          
        }
      } else {
        $addToCart.addClass('disabled').prop('disabled', true);
        $addToCartText.html("Indisponible");
        $productPrice.html("Indisponible");
        $comparePrice.hide();
        $comparePriceClass.hide();
        
      }
    } else {
      $comparePrice.hide();
      $comparePriceClass.hide();
      
      $addToCart.addClass('disabled').prop('disabled', true);
      $addToCartText.html("Indisponible");
      $productPrice.html("Indisponible");
    }
    
  };

  timber.productImageSwitch = function () {
    if (timber.cache.$thumbImages.length) {
      timber.cache.$thumbImages.on('click', function(evt) {
        evt.preventDefault();
        var newImage = $(this).attr('href');
        timber.switchImage(newImage, null, timber.cache.$productImage);
      });
    }
  };

  timber.switchImage = function (src, imgObject, el) {
    // Make sure element is a jquery object
    var $el = $(el);
    $el.attr('src', src);
  };

  timber.responsiveVideos = function () {
    var $iframeVideo = $('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]');
    var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');

    $iframeVideo.each(function () {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="video-wrapper"></div>');
    });

    $iframeReset.each(function () {
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  };

  timber.collectionViews = function () {
    if (timber.cache.$changeView.length) {
      timber.cache.$changeView.on('click', function() {
        var view = $(this).data('view'),
            url = document.URL,
            hasParams = url.indexOf('?') > -1;

        if (hasParams) {
          window.location = replaceUrlParam(url, 'view', view);
        } else {
          window.location = url + '?view=' + view;
        }
      });
    }
  };
  timber.bxSliderApply = function (options) {
    $(".product--images").css('visibility', 'visible');
    $(".product-single").css('visibility', 'visible');
    if(options.total_images > 1) {
      $('#bxslider-id-'+options.product_id).bxSlider({
        pagerCustom: '#bx-pager-'+options.product_id,
        infiniteLoop: false,
        touchEnabled: true,
        adaptiveHeight: true
      });
      if(options.total_images > options.offset) {
        /* if settings.thumb_as_slider */
        $('#bx-pager-'+options.product_id).bxSlider({
          infiniteLoop: false,
          slideWidth: 80,
          slideMargin: 10,
          minSlides: 2,
          maxSlides: 4,
          moveSlides: 1
        });
        $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-prev').on('click', function(e){
          e.preventDefault();
          var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
          if($(currentLi).prev("li").length > 0) {
            $(currentLi).prev("li").children('a').children('img').trigger('click');
          }
          return false;
        });
        $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-next').on('click', function(e){
          e.preventDefault();
          var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
          if($(currentLi).next("li").length > 0) {
            $(currentLi).next("li").children('a').children('img').trigger('click');
          }
          return false;
        });
        /* endif */
      }
    }
  };
  var slider, slider1;
  timber.bxSliderApplyQuickView = function (options) {
    $(".product--images").css('visibility', 'visible');
    $(".product-single").css('visibility', 'visible');
    if(options.total_images > 1) {
      slider = $('#bxslider-id-'+options.product_id).bxSlider({
        pagerCustom: '#bx-pager-'+options.product_id,
        infiniteLoop: false,
        touchEnabled: true,
        adaptiveHeight: true
      });
      if(options.total_images > options.offset) {

        slider1 = $('#bx-pager-'+options.product_id).bxSlider({
          infiniteLoop: false,
          slideWidth: 80,
          slideMargin: 10,
          minSlides: 2,
          maxSlides: 2,
          moveSlides: 1
        });
        $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-prev').on('click', function(e){
          e.preventDefault();
          var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
          if($(currentLi).prev("li").length > 0) {
            $(currentLi).prev("li").children('a').children('img').trigger('click');
          }
          return false;
        });
        $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-next').on('click', function(e){
          e.preventDefault();
          var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
          if($(currentLi).next("li").length > 0) {
            $(currentLi).next("li").children('a').children('img').trigger('click');
          }
          return false;
        });

      }
    }
  };

  timber.sliderClickCallback = function () {
    $('.product-single__thumbnail img').click(function(e){
      e.preventDefault();
      var variant_img = $(this).data('ver');
      var product_id = $(this).parent('a').parent('li').parent('ul').data('product');
      if($("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").val() !== undefined && $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").attr("disabled") === undefined){
        var option1 = $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").data('option1');
        var option2 = $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").data('option2');
        var option3 = $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").data('option3');
        
        setTimeout(function(){
          var op1 = op2 = op3 = false;
          if(option1 !== ""){
            var currentValue = $("#AddToCartForm--"+product_id).find("select[data-option='option1']").val();
            if(currentValue !== option1){
              op1 = true;
              $("#AddToCartForm--"+product_id).find("select[data-option='option1']").val(option1);
            }
          }
          if(option2 !== ""){
            var currentValue = $("#AddToCartForm--"+product_id).find("select[data-option='option2']").val();
            if(currentValue !== option2){
              op2 = true;
              $("#AddToCartForm--"+product_id).find("select[data-option='option2']").val(option2);
            }
          }
          if(option3 !== ""){
            var currentValue = $("#AddToCartForm--"+product_id).find("select[data-option='option3']").val();
            if(currentValue !== option3){
              op3 = true;
              $("#AddToCartForm--"+product_id).find("select[data-option='option3']").val(option3);
            }
          }
          if(op3) {
            $("#AddToCartForm--"+product_id).find("select[data-option='option3']").change();
          } else if(op2) {
            $("#AddToCartForm--"+product_id).find("select[data-option='option2']").change();
          } else if(op1) {
            $("#AddToCartForm--"+product_id).find("select[data-option='option1']").change();
          }
        }, 200);
        
      }
    });
  };

  timber.qtySelectors = function() {
    var numInputs = $('input[type="number"]');

    if (numInputs.length) {
      numInputs.each(function() {
        var $el = $(this),
            currentQty = $el.val(),
            inputName = $el.attr('name'),
            inputId = $el.attr('id');

        var itemAdd = currentQty + 1,
            itemMinus = currentQty - 1,
            itemQty = currentQty;

        var source   = $("#JsQty").html(),
            template = Handlebars.compile(source),
            data = {
              key: $el.data('id'),
              itemQty: itemQty,
              itemAdd: itemAdd,
              itemMinus: itemMinus,
              inputName: inputName,
              inputId: inputId
            };
        $el.after(template(data)).remove();
      });

      $('.js-qty__adjust').on('click', function() {
        var $el = $(this),
            id = $el.data('id'),
            $qtySelector = $el.siblings('.js-qty__num'),
            qty = parseInt($qtySelector.val().replace(/\D/g, ''));

        if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {

        } else {
          qty = 1;
        }

        if ($el.hasClass('js-qty__adjust--plus')) {
          qty += 1;
        } else {
          qty -= 1;
          if (qty <= 1) qty = 1;
        }

        $qtySelector.val(qty);
      });
    }
  };

  timber.swatchChange = function () {
    $('.swatch :radio').change(function() {
      var optionIndex = $(this).closest('.swatch').attr('data-option-index');
      var optionValue = $(this).val();
      $(this).closest('form').find('.single-option-selector').eq(optionIndex).val(optionValue).trigger('change');
    });
  };

 
  timber.magniflierImageZoom = function () {
    if ($('.magniflier').length) {
      if($(window).width() > 991){
        $(function() {
          var native_width = 0;
          var native_height = 0;
          var mouse = {x: 0, y: 0};
          var magnify;
          var cur_img;

          var ui = {
            magniflier: $('.magniflier')
          };

          if (ui.magniflier.length) {
            var div = document.createElement('div');
            div.setAttribute('class', 'glass');
            ui.glass = $(div);
            $('.large--eleven-twelfths.cont-photos').append(div);
          }

          var mouseMove = function(e) {
            var $el = $(this);
            var magnify_offset = cur_img.offset();
            mouse.x = e.pageX - magnify_offset.left;
            mouse.y = e.pageY - magnify_offset.top;
            if ( mouse.x < cur_img.width() && mouse.y < cur_img.height() && mouse.x > 0 && mouse.y > 0 ) {
              magnify(e);
            } else {
              ui.glass.fadeOut(100);
            }
            return;
          };

          var magnify = function(e) {
            var rx = Math.round(mouse.x/cur_img.width()*native_width - ui.glass.width()/2)*-1;
            var ry = Math.round(mouse.y/cur_img.height()*native_height - ui.glass.height()/2)*-1;
            var bg_pos = rx + "px " + ry + "px";
            // var glass_left = mouse.x - ui.glass.width() / 2;
            // var glass_top  = mouse.y - ui.glass.height() / 2;
            var glass_left = e.pageX - ui.glass.width() / 2;
            var glass_top  = e.pageY - ui.glass.height() / 2;
            ui.glass.css({
              left: glass_left,
              top: glass_top,
              backgroundPosition: bg_pos
            });
            return;
          };

          $('.magniflier').on('mousemove', function() {
            ui.glass.fadeIn(100);
            cur_img = $(this);
            var large_img_loaded = cur_img.data('large-img-loaded');
            var src = cur_img.data('large') || cur_img.attr('src');
            if (src) {
              ui.glass.css({
                'background-image': 'url(' + src + ')',
                'background-repeat': 'no-repeat'
              });
            }
            if (!cur_img.data('native_width')) {
              var image_object = new Image();
              image_object.onload = function() {
                native_width = image_object.width;
                native_height = image_object.height;
                cur_img.data('native_width', native_width);
                cur_img.data('native_height', native_height);
                mouseMove.apply(this, arguments);
                ui.glass.on('mousemove', mouseMove);
              };
              image_object.src = src;
              return;
            } else {
              native_width = cur_img.data('native_width');
              native_height = cur_img.data('native_height');
            }
            mouseMove.apply(this, arguments);
            ui.glass.on('mousemove', mouseMove);
          });

          addEvent(window,"load",function(e) {
            addEvent(document, "mouseout", function(e) {
              e = e ? e : window.event;
              var from = e.relatedTarget || e.toElement;
              if (!from || from.nodeName == "HTML") {
                ui.glass.fadeOut(100);
              }
            });
          });

          $('.site-header').hover(function(){
            ui.glass.fadeOut(100);
          });

          $('.glass').click(function(){
            ui.glass.fadeOut(100);
          });

          ui.glass.on('mouseout', function() {
            ui.glass.off('mousemove', mouseMove);
          });

        });
      }
    }
  };
 
	
  

  timber.fancybox = function () {
    if ($('.fancybox').length) {
      if($(window).width() > 767) {
        $('.fancybox').fancybox();
        $('body').on('click', '.glass', function(){
          var data_index = $('.product-single__thumbnails').find('.active').data('slide-index');
          $(".product-single__photos a[data-index-slide='" + data_index + "']").trigger('click');
        });
      } else {
        $('.fancybox').click(function(e) {
          e.preventDefault();
        });
        $(document).ready(function(){
          $('.fancyboxmobile').fancybox();      
        });
      }
    }
  };
  timber.modalBox = function () {
    var modal;
    var modalHTML;
    var btn = $("[data-toggle='modal']");
    var close = $("[data-toggle='close-modal']");

    $(btn).click(function(e){
      e.preventDefault();
      modal = $($(this).data('target'));
      if($(window).width() > 767){
        var width = "600px";
      } else {
        var width = "90%";  
      }
      $(modal).find('.modal-content').css('width', width);
      $(modal).addClass("in");
      modalHTML = $(this).data('target').replace("#", "");
    });

    $(close).click(function(e){
      e.preventDefault();
      $(modal).removeClass("in");
    });

    window.onclick = function(event) {
      if (event.target.id == modalHTML) {
        $(modal).removeClass("in");
      }
    }
  };

  timber.recordLastCollection = function (options) {

  };
  function openpopup(url,name) {
    window.open(url,name,'width=500,height=300');	
  }
}

// Initialize Timber's JS on docready
$(timber.init)

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/* ================ SECTIONS ================ */ 
window.theme = window.theme || {};

theme.HeaderSection = (function() {

  function Header() {
    timber.cacheSelectors();
    timber.toggleMenu();

    $(window).on('load', timber.responsiveNav).resize();
  }

  return Header;
})();
if($('body').hasClass('template-index')) {
  theme.Slideshow = (function(el) {    
    this.cache = {
      $slider: $(el),
      sliderArgs: {
        animation: 'slide',
        animationSpeed: 500,
        pauseOnHover: true,
        keyboard: false,
        slideshow: $(el).data('slider-home-auto'),
        slideshowSpeed: $(el).data('slider-home-rate'),
        smoothHeight: true,
        before: function(slider) {
          $(slider).resize();
          $(slider).find('.slide').not('.flex-active-slide').removeClass('slide-hide');
        },
        after: function(slider) {
          $(slider).find('.slide').not('.flex-active-slide').addClass('slide-hide');
        },
        start: function(slider) {
          $(slider).find('.slide').not('.flex-active-slide').addClass('slide-hide');
          if ($(slider).find('.slide').not('.clone').length === 1) {
            $(slider).find('.flex-direction-nav').remove();
          }
          $(window).trigger('resize');
          slider.addClass('loaded');
          if ($('#slider').data('loaded-index') != undefined) {
            $('#slider').flexslider($('#slider').data('loaded-index'));
          }
        }
      }
    }
    if (this.cache.$slider.find('li').length === 1) {
      this.cache.sliderArgs.touch = false;
    }

    this.cache.$slider.flexslider(this.cache.sliderArgs)

  });

  theme.slideshows = theme.slideshows || {};

  theme.SlideshowSection = (function() {

    function SlideshowSection(container) {
      var $container = this.$container = $(container);
      var id = $container.attr('data-section-id');
      var slideshow = this.slideshow = '#heroSlider--' + id;
      theme.slideshows[slideshow] = new theme.Slideshow(slideshow);
    }

    return SlideshowSection;

  })();

  theme.SlideshowSection.prototype = _.assignIn({}, theme.SlideshowSection.prototype, {

    onUnload: function() {
      delete theme.slideshows[this.slideshow];
    },

    onBlockSelect: function(evt) {
      var $slideshow = $(this.slideshow);
      var $slide = $('#slide--' + evt.detail.blockId + ':not(.clone)');

      var slideIndex = $slide.data('flexslider-index');
      var $slideImg = $slide.find('img') || $slide.find('svg');

      $slide.imagesLoaded($slideImg,function(){
        $slideshow.flexslider(slideIndex);
        $slideshow.flexslider("pause");
      });

    },

    onBlockDeselect: function() {
      $(this.slideshow).flexslider('play');
    }

  });

}
/* eslint-disable no-new */
theme.Product = (function() {
  var defaults = {
    selectors: {
      addToCart: '#addToCart',
      productPrice: '#productPrice',
      comparePrice: '#comparePrice',
      addToCartText: '#addToCartText',
      quantityElements: '.quantity-selector, label + .js-qty',
      optionSelector: 'productSelect',
    }
  };

  function Product(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');

    this.settings = $.extend({}, defaults, {
      sectionId: sectionId,
      enableHistoryState: true,
      showComparePrice: $container.attr('data-show-compare-at-price'),
      stockSetting: $container.attr('data-stock'),
      incomingMessage: $container.attr('data-incoming-transfer'),
      selectors: {
        $originalSelectorId: 'productSelect-' + sectionId,
        $addToCart: $('#addToCart'),
        $SKU: $('.variant-sku'),
        $productPrice: $('#productPrice-' + sectionId),
        $comparePrice: $('#comparePrice-' + sectionId),
        $addToCartText: $('#addToCartText-' + sectionId),
        $quantityElements: $('#quantity-selector-' + sectionId),
        $variantQuantity: $('#variantQuantity-' + sectionId),
        $variantIncoming: $('#variantIncoming-' + sectionId),
        $productImageWrap: $('#productPhoto-' + sectionId),
        $productImage: $('#productPhotoImg-' + sectionId),
        $thumbImages: $('#productThumbs-' + sectionId).find('a.product-photo-thumb'),
      }
    });

    // disable history state if on homepage
    if($('body').hasClass('template-index')) {
      this.settings.enableHistoryState = false;
    }

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$('#ProductJson-' + sectionId).html()) {
      return;
    }

    // this.productSingleObject = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);
    this.productSingleObject = JSON.parse($('#ProductJson-' + sectionId).html());
    this.addVariantInfo();
    this.init();

    // Pre-loading product images to avoid a lag when a thumbnail is clicked, or
    // when a variant is selected that has a variant image
    /*Shopify.Image.preload(this.productSingleObject.images);*/
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    init: function() {
      this.initProductVariant();
      this.addQuantityButtons();
      this.productImageSwitch();
      this.initBreakpoints();

      if (timber.vars.isLargeBp) {
        productImageZoom();
      }
    },

    onUnload: function() {
      this.$container.off(this.settings.sectionId);
    },

    addVariantInfo: function() {
      if (!this.productSingleObject) {
        return;
      }

      if (this.settings.stockSetting === 'false' && this.settings.incomingMessage === 'false'){
        return;
      }

      var variantInfo = JSON.parse($('#VariantJson-' + this.settings.sectionId).html());
      for (var i = 0; i < variantInfo.length; i++) {
        $.extend(this.productSingleObject.variants[i], variantInfo[i]);
      }
    },

    addQuantityButtons: function(){
      if (this.settings.selectors.$quantityElements){
        this.settings.selectors.$quantityElements.show();
        
      }

    },

    qtySelectors: function() {

      validateQty = function (qty) {
        if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
          // We have a valid number!
          return qty;
        } else {
          // Not a number. Default to 1.
          return 1;
        }
      };

      // Change number inputs to JS ones, similar to ajax cart but without API integration.
      // Make sure to add the existing name and id to the new input element
      var numInputs = $('input[type="number"]');

      // Qty selector has a minimum of 1 on the product page
      // and 0 in the cart (determined on qty click)
      var qtyMin = 0;

      if (numInputs.length) {
        numInputs.each(function() {
          var el = $(this),
              currentQty = parseInt(el.val()),
              inputName = el.attr('name'),
              inputId = el.attr('id');

          var itemAdd = currentQty + 1,
              itemMinus = currentQty - 1,
              itemQty = currentQty;

          var source   = $("#jsQty").html(),
              template = Handlebars.compile(source),
              data = {
                key: el.data('id'),
                itemQty: itemQty,
                itemAdd: itemAdd,
                itemMinus: itemMinus,
                inputName: inputName,
                inputId: inputId
              };

          // Append new quantity selector then remove original
          el.after(template(data)).remove();
        });

        // Setup listeners to add/subtract from the input
        $('.js--qty-adjuster').on('click', function() {
          var el = $(this),
              id = el.data('id'),
              qtySelector = el.siblings('.js--num'),
              qty = parseInt( qtySelector.val() );

          var qty = validateQty(qty);
          qtyMin = timber.cache.$body.hasClass('template-product') ? 1 : qtyMin;

          // Add or subtract from the current quantity
          if (el.hasClass('js--add')) {
            qty = qty + 1;
          } else {
            qty = qty <= qtyMin ? qtyMin : qty - 1;
          }

          // Update the input's number
          qtySelector.val(qty);
        });

      }
    },

    initBreakpoints: function () {

      var self = this;
      var $container = self.$container;
      self.zoomType = $container.data('zoom-enabled');

      if (!$('html').hasClass('lt-ie9')) {
        enquire.register(timber.vars.mediaQueryLarge, {
          match: function() {
            if (self.zoomType) {
              // reinit product zoom
              productImageZoom();
            }

            timber.vars.isLargeBp = true;
          },
          unmatch: function() {
            if (self.zoomType) {

              if ((self.settings.selectors.$productImage).length) {
                // remove event handlers for product zoom on mobile
                self.settings.selectors.$productImage.off();
                self.settings.selectors.$productImageWrap.trigger('zoom.destroy');
              }
            }

            timber.vars.isLargeBp = false;
          }
        });
      }

    },

    productImageSwitch: function() {
      if (!this.settings.selectors.$thumbImages.length) {
        return;
      }

      var self = this;

      // Switch the main image with one of the thumbnails
      // Note: this does not change the variant selected, just the image
      self.settings.selectors.$thumbImages.on('click', function(evt) {
        evt.preventDefault();
        var newImage = $(this).attr('href');
        var newImageId = $(this).attr('data-image-id');

        self.switchImage(newImage, { id: newImageId }, self.settings.selectors.$productImage);

      });


    },

    switchImage: function (src, imgObject, el) {
      // Make sure element is a jquery object
      var $el = $(el);
      $el.attr('src', src);

      if (this.settings.selectors.$productImage.attr('data-zoom') && timber.vars.isLargeBp) {
        var zoomSrc = src.replace('_compact.','_1024x1024.').replace('_medium.','_1024x1024.').replace('_large.','_1024x1024.');
        $el.attr('data-zoom', zoomSrc);

        $(function() {
          productImageZoom();
        });
      }

    },

    initProductVariant: function() {
      // this.productSingleObject is a global JSON object defined in theme.liquid
      if (!this.productSingleObject) {
        return;
      }

      var self = this;
      this.optionSelector = new Shopify.OptionSelectors(self.settings.selectors.$originalSelectorId, {
        selectorClass: self.settings.selectors.$optionSelectorClass,
        product: self.productSingleObject,
        onVariantSelected: self.productVariantCallback,
        enableHistoryState: self.settings.enableHistoryState,
        settings: self.settings
      });

      // Clean up variant labels if the Shopify-defined
      // defaults are the only ones left
      this.simplifyVariantLabels(this.productSingleObject);

    },

    simplifyVariantLabels: function(productObject) {
      // Hide variant dropdown if only one exists and title contains 'Default'
      if (productObject.variants.length && productObject.variants[0].title.indexOf('Default') >= 0) {
        $('.selector-wrapper').hide();
      }
    },

    // **WARNING** This function actually inherits `this` from `this.optionSelector` not
    // from `product` when passed in as a callback for `option_selection.js`
    productVariantCallback: function(variant) {
      if (variant) {
        // Update variant image, if one is set
        if (variant.featured_image) {
          var newImg = variant.featured_image,
              el = this.settings.selectors.$productImage[0],
              zoomSrc = $(newImg).attr('src').replace('.jpg','_1024x1024.jpg').replace('.jpeg','_1024x1024.jpeg').replace('.png','_1024x1024.png'),
              $zoomImg = $('.zoomImg');


          /*$('.single-option-selector').change(function() { 
          Shopify.Image.switchImage(newImg, el, this.switchImage);

          });*/
          Shopify.Image.switchImage(newImg, el, this.switchImage);

          if (this.settings.selectors.$productImage.attr('data-zoom') && timber.vars.isLargeBp) {
            // reint zoom attributes on image variant
            this.settings.selectors.$productImage.attr('data-zoom', zoomSrc);
            $zoomImg.attr('src', zoomSrc);
          }
        }

        if (variant.available) {
          // We have a valid product variant, so enable the submit button
          this.settings.selectors.$addToCart.removeClass('disabled').prop('disabled', false);
          this.settings.selectors.$addToCartText.html("Acheter maintenant");

          this.settings.selectors.$variantQuantity.removeClass('is-visible');
          this.settings.selectors.$variantIncoming.removeClass('is-visible');

          if (variant.inventory_management) {
            // Show how many items are left, if below 10
            if (variant.inventory_quantity < 10 && variant.inventory_quantity > 0 && this.settings.stockSetting == 'true') {
              this.settings.selectors.$variantQuantity.html(theme.strings.product.only_left.replace('1', variant.inventory_quantity)).addClass('is-visible');
            }
          }

          // Show next ship date if quantity <= 0 and stock is incoming
          if (variant.inventory_quantity <= 0 && variant.incoming != null ) {
            if (variant.next_incoming_date != null){
              this.settings.selectors.$variantIncoming.html(theme.strings.product.will_be_in_stock_after.replace('[date]', variant.next_incoming_date)).addClass('is-visible');
            }
          }
        } else {

          // Variant is sold out, disable the submit button
          this.settings.selectors.$addToCart.addClass('disabled').prop('disabled', true);
          this.settings.selectors.$addToCartText.html("Épuisé");

          this.settings.selectors.$variantQuantity.removeClass('is-visible');
          this.settings.selectors.$variantIncoming.removeClass('is-visible');

          // Show next stock incoming date if stock is incoming
          if (variant.inventory_management) {
            if (variant.incoming && this.settings.incomingMessage == 'true' && variant.incoming != null && variant.next_incoming_date != null) {
              this.settings.selectors.$variantIncoming.html(theme.strings.product.will_be_in_stock_after.replace('[date]', variant.next_incoming_date)).addClass('is-visible');
            }
          }

          this.settings.selectors.$quantityElements.hide();
        }

        // Regardless of stock, update the product price
        var customPrice = timber.formatMoney( Shopify.formatMoney(variant.price, moneyFormat) );
        var a11yPrice = Shopify.formatMoney(variant.price, moneyFormat);
        var customPriceFormat = ' <span aria-hidden="true">' + customPrice + '</span>';
        customPriceFormat += ' <span class="visually-hidden">' + a11yPrice + '</span>';

        // Show SKU
        this.settings.selectors.$SKU.html(variant.sku)

        if (this.settings.showComparePrice == 'true' ) {
          if (variant.compare_at_price > variant.price) {
            var comparePrice = timber.formatMoney(Shopify.formatMoney(variant.compare_at_price, moneyFormat));
            var a11yComparePrice = Shopify.formatMoney(variant.compare_at_price, moneyFormat);

            customPriceFormat = ' <span aria-hidden="true">' + customPrice + '</span>';
            customPriceFormat += ' <span aria-hidden="true"><s>' + comparePrice + '</s></span>';
            customPriceFormat += ' <span class="visually-hidden"><span class="visually-hidden">Prix régulier</span> ' + a11yComparePrice + '</span>';
            customPriceFormat += ' <span class="visually-hidden"><span class="visually-hidden">Prix réduit</span> ' + a11yPrice + '</span>';
          }
        }
        this.settings.selectors.$productPrice.html(customPriceFormat);

        // Also update and show the product's compare price if necessary
        if ( variant.compare_at_price > variant.price ) {
          var priceSaving = Shopify.formatMoney(variant.compare_at_price - variant.price, moneyFormat);
          
          var priceSaving = '<span class="price-sale2"> ' + priceSaving + '</span>';
          var priceSaving2 = timber.formatSaleTag( Shopify.formatMoney(variant.compare_at_price - variant.price, "") );
                                                                       var priceSaving2 = ((variant.compare_at_price - variant.price)/variant.compare_at_price*100).toFixed()+"%";

          this.settings.selectors.$comparePrice.html("\u003cspan class='save-text'\u003eÉconomisez\u003c\/span\u003e [$]".replace('[$]', priceSaving + " <span class='price-saving-percent'><span class='parentheses'>(</span>-" + priceSaving2 + "<span class='parentheses'>)</span></span>")).show();
        } else {
          this.settings.selectors.$comparePrice.hide();
        }

      } else {
        // The variant doesn't exist, disable submit button.
        // This may be an error or notice that a specific variant is not available.
        this.settings.selectors.$addToCart.addClass('disabled').prop('disabled', true);
        this.settings.selectors.$addToCartText.html(theme.strings.product.unavailable);
        this.settings.selectors.$variantQuantity.removeClass('is-visible');
        this.settings.selectors.$quantityElements.hide();
      }

    }

  });

  function productImageZoom() {

    var $productImageWrap = $('.productPhoto'),
        $productImage = $('.productPhotoImg');

    if (timber.vars.isLargeBp) {
      if (!$productImage.attr('data-zoom')) {
        return;
      }

      if (!$productImageWrap.length || timber.cache.$html.hasClass('supports-touch')) {
        return;
      };

      // Destroy zoom (in case it was already set), then set it up again
      $productImageWrap.trigger('zoom.destroy');
      $productImageWrap.addClass('image-zoom').zoom({
        url: $productImage.attr('data-zoom')
      });
    }
  }

  return Product;

})();


$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('header-section', theme.HeaderSection);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('product-template', theme.Product);
});

$(document).ready(function() {
  $('ul.tabs').each(function(){
    var active, content, links = $(this).find('a');
    active = links.first().addClass('active');
    content = $(active.attr('href'));
    links.not(':first').each(function () {
      $($(this).attr('href')).hide();
    });
    $(this).find('a').click(function(e){
      active.removeClass('active');
      content.hide();
      active = $(this);
      content = $($(this).attr('href'));
      active.addClass('active');
      content.show();
      return false;
    });
  });

  if (window.matchMedia("(min-width: 800px)").matches) {  

    $(window).scroll(function(){ 

      var a = 112;
      var pos = $(window).scrollTop();
      if(pos > a) {
        /*$(".size-format-true .cont-header .large--text-right").hide();
      $(".size-format-true .cont-header").addClass('small-header');
      $(".site-header .grid--full").addClass('small-grid');
      $(".size-format-true .header2 .header-logo img").addClass('small-logo');*/
        $(".size-format-true .cont-header .header-wrapper").css({'padding-top':'5px'});
        $(".size-format-true .cont-header").css({'background':'rgba(255,255,255,0.75);'});
        $(".topheader").hide();
        $(".size-format-true .header-fixed-true").addClass('header-scroll-on');
      }
      else {
        $(".size-format-true .cont-header .site-header").css({'padding-top':'0'});
        $(".size-format-true .cont-header").css({'background':'rgba(255,255,255,0.99);'});
        $(".topheader").show();
        $(".size-format-true .header-fixed-true").removeClass('header-scroll-on');
      }
    });
  }
});


$(document).ready(function() {
  $('.template-collection .mono-produit-true').remove('aside');
  $('.template-collection .mono-produit-true .hr--offset-left').css('margin-left','0');  
  $('.template-collection .mono-produit-true .grid-item').removeClass('large--four-fifths'); 
  $('.template-collection .mono-produit-true .grid-item').removeClass('grid-border--left');
  var headerHeight = ($(".size-format-true .cont-header").height() + -5);
  var headerHeight2 = headerHeight + 40;

  if($('.cont-header').hasClass('header1')) {
    if($('.cont-header').hasClass('header-fixed-true')) {
      $(".size-format-true .main-content").css("padding-top",headerHeight2 + "px");
      $(".template-index.size-format-true .main-content").css("padding-top",headerHeight + "px");
    }
  }

  if($('.cont-header').hasClass('header2') || $('.cont-header').hasClass('header3') || $('.cont-header').hasClass('header4')) {
    if($('.cont-header').hasClass('header-fixed-true')) {
      $(".size-format-true .main-content").css("padding-top",headerHeight2 + "px");
      $(".template-index.size-format-true .main-content").css("padding-top",headerHeight + "px");
    }
  } 
  $( ".flexslider" ).fadeTo( "300" , 1, function() {
    // Animation complete.
  });
});

if($("#showcdtimer").length > 0){ 
  $('#gdcdtimer').show(); 
}
else {
  $('#gdcdtimer').hide(); 
}
/* testimonials */
$('.carousel-inner .item').eq(0).addClass('active');
/*$(".update-cart").hide();
 $(".cart__quantity-selector").focusout(function() {
 $( ".update-cart" ).click();
});*/
/* codes personalises */
jQuery(function($) {
  var min = $('.visitor-number1').text();
  var max = $('.visitor-number2').text();
  min = parseInt(min);
  max = parseInt(max);
  var min2 = 5;
  var max2 = 25; 
  min2 = Math.ceil(min2);
  max2 = Math.ceil(max2);
  var sale = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
  var r = Math.floor(Math.random() * (max - min) + min);
  var inc = '0' ;
  var mytimeAgo = ['1', '2', '3','-1', '-2']; 
  var randomlytimeAgo='';
  var currentmytimeAgo='';
  var plus = ['5', '10', '15']; 
  var randomlytimeAgo='';
  var currentmytimeAgo=''; 
  var range=''; 
  jQuery("#dynamic_counter").html(r);
  setInterval(function(){ 
    randomlytimeAgo = Math.floor(Math.random() * mytimeAgo.length);
    currentmytimeAgo = mytimeAgo[randomlytimeAgo];
    r = parseInt(r)+parseInt(currentmytimeAgo); 
 
    jQuery("#dynamic_counter").html(r); 

  }, 10000);
  jQuery("#last_sale").html(sale);
});

var upsellNb = $('.cont-upsell').length;
if (upsellNb < 2) {
  $('.delayedPopupWindow').addClass('upsell-one');
}
if (upsellNb < 3) {
  $('.delayedPopupWindow').addClass('upsell-noheight');
}
if (upsellNb == 3) {
  $('.delayedPopupWindow').addClass('upsell-3');
}


if (window.matchMedia("(max-width: 767px)").matches) {
  $('#carousel').flexslider({
    animation: "slide",
    controlNav: true,
    animationLoop: true,
    slideshow: true,
    itemWidth: 85,
    itemMargin: 3,
    asNavFor: '#slider'
  });
}
else {
  $('#carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 125,
    itemMargin: 5,
    asNavFor: '#slider'
  });
}

$('#slider').flexslider({
  animation: "slide",
  controlNav: false,
  animationLoop: false,
  slideshow: false,
  sync: "#carousel",
  start: function(slider){
    $('body').removeClass('loading');
  }
});
$(document).ready(function() {
 $('.flexslider-product').flexslider({
   animation: "slide",
   animationLoop: false,
   slideshow: false,
   pauseOnHover: false,
   touch: true,
   easing: "swing",
   controlNav: "thumbnails"

 });
});
$( document ).ready(function() {  

  $(".product-variants option").each(function() {
    var text = $(this).text();
    text = text.replace("Default Title", "Prix");
    $(this).text(text);
  });
 
  var goContent = $(".shopify-section").eq(2).attr('id');
  var HeaderSection = ($(".cont-header").height() - 37);
  var HeaderSectionMobile = ($(".cont-header").height() - 67);
  $(".size-format-true .movearrow").eq(0).show();
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('.movearrow').on('click', function() {
      $('html,body').animate({
        scrollTop: ($("#" + goContent).offset().top) - HeaderSectionMobile},'slow');
    });
  }
  else {
    $('.movearrow').on('click', function() {
      $('html,body').animate({
        scrollTop: ($("#" + goContent).offset().top) - HeaderSection},'slow');
    });
  }

  $('#accordion .panel-title a').click(function(){
    var $t = $(this);
    var $p = $t.parents('#accordion');
    var isClosed = $t.hasClass('collapsed');
    if(isClosed){
      if($p.find('.in').length){
        var $open = $p.find('.in')
        $open.slideUp( "300", function() {
          $open.removeClass('in');
        });
        $open.parents('.panel').find('.panel-title a').addClass('collapsed');
      }
      var $toOpen = $t.parents('.panel').find('.panel-collapse');
      $t.removeClass('collapsed');
      $toOpen.slideDown( "300", function() {
        $toOpen.addClass('in');
      });

    }else{
      var $open = $p.find('.in')
      $open.slideUp( "slow", function() {
        $open.removeClass('in');
      });
      $open.parents('.panel').find('.panel-title a').addClass('collapsed');
    }
    return false;
  });
});
$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("slow")}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("slow")}else{$(scrollDiv).fadeIn("slow")}});$(this).click(function(){$("html, body").animate({scrollTop:0},"slow")})}}); 
$(function(){
  $("#toTop").scrollToTop();
});



$(".lightSlider").lightSlider({
        item: 4,
        autoWidth: false,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 0,

        addClass: '',
        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear', //'for jquery animation',////

        speed: 400, //ms'
        auto: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,

        keyPress: false,
        controls: true,
        prevHtml: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        nextHtml: '<i class="fa fa-angle-right" aria-hidden="true"></i>',

        rtl:false,
        adaptiveHeight:false,

        vertical:false,
        verticalHeight:500,
        vThumbWidth:100,

        thumbItem:16,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',

        enableTouch:true,
        enableDrag:true,
        freeMove:true,
        swipeThreshold: 40,

        responsive : [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {},
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {},
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });

$( document ).ready(function() {

  $('#bkgOverlay').click(function(){
    $('#bkgOverlay').fadeOut();
    $('#delayedPopup').slideUp();
  });
  $("body").one('mouseleave', function()  {
    $('#exitpopup').css('left', (window.innerWidth/2 - $('#exitpopup').width()/2));
    $('#exitpopup').css('top', (window.innerHeight/2 - $('#exitpopup').height()/2));
    // Show the exit popup
    $('#exitpopup_bg').fadeIn();
    $('#exitpopup').fadeIn();   
  });

  if (window.matchMedia("(max-width: 767px)").matches) {
    setTimeout(function(){ 
      $('#exitpopup').css('left', (window.innerWidth/2 - $('#exitpopup').width()/2));
      $('#exitpopup').css('top', (window.innerHeight/2 - $('#exitpopup').height()/2));
      $('#exitpopup_bg').fadeIn();
      $('#exitpopup').fadeIn();
    }, 16000);
  } 

  $('#exitpopup_bg').click(function(){
    $('#exitpopup_bg').fadeOut();
    $('#exitpopup').slideUp();
  });
  $('.box-close').click(function(){
    $('#exitpopup_bg').fadeOut();
    $('#exitpopup').slideUp();
  });

});
$(document).ready(function() {
  var box1 = $("#box1"),
      box2 = $("#box2"),
      box3 = $("#box3"),
      kick = $("#kick_jump"),
      startButton = $("#start_game"),
      messageBar = $("#msg_bd"),
      kickDropDownAnimationDelay = 1500,
      shuffleSpeed = 1100,
      nuberOfShuffels = 8,
      z = 0;

  var ans = Math.floor(Math.random() * 3) + 1;

  startButton.on("click", function(event) {
    event.preventDefault();
    var kickInitialPosition = 0;
    //Show the character fist
    kick.show();
    // Show the message "Starting the game"
    setMessage("Le jeu commence", "color_0");
               // Update the initial position based on the answer
               kickInitialPosition = 20 + ((ans - 1) * 115);

    // Move kick Under the relative box based on answer
    kick.css({
      left: kickInitialPosition + "px"
    });

    // Droping kick from the top into the box.
    kick.animate({
      top: "80px"
    }, {
      duration: kickDropDownAnimationDelay,
      specialEasing: {
        top: 'easeOutBounce'
      },
      complete: function() {
        kick.html("<img src='https://cdn.shopify.com/s/files/1/2653/6644/files/kick_smile-m.png' alt='' />");
        kick.animate({
          top: "98px"
        }, {
          duration: 500,
          specialEasing: {
            top: 'easeInQuint'
          },
          complete: function() {
            setMessage("Les boîtes se ferment...")

                       // Close all the three boxes in a regular interval.
                       box1.delay(500).queue(function(n) {
              $(this).html("<img src='https://cdn.shopify.com/s/files/1/2653/6644/files/box_c-m.png' alt='' />");
              if (ans == 1) kick.hide();
              n();
            });
            box2.delay(1000).queue(function(n) {
              $(this).html("<img src='https://cdn.shopify.com/s/files/1/2653/6644/files/box_c-m.png' alt='' />");
              if (ans == 2) kick.hide();
              n();
            });
            box3.delay(1500).queue(function(n) {
              $(this).html("<img src='https://cdn.shopify.com/s/files/1/2653/6644/files/box_c-m.png' alt='' />");
              if (ans == 3) kick.hide();


              var box1_left = box1.position().left,
                  box2_left = box2.position().left,
                  box3_left = box3.position().left,
                  box_top = box3.position().top;

              box1.css({
                position: "absolute",
                top: box_top + "px",
                left: box1_left + "px"
              });

              box2.css({
                position: "absolute",
                top: box_top + "px",
                left: box2_left + "px"
              });

              box3.css({
                position: "absolute",
                top: box_top + "px",
                left: box3_left + "px"
              });

              shuffle = function(o) { //v1.0
                for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
              };

              var interval = setInterval(function() {

                setMessage("Déplacement en cours...");



                           var array = shuffle([1, 2, 3]);

                $("#box" + array[0]).animate({
                  left: $("#box" + array[1]).position().left + "px"
                }, {
                  duration: shuffleSpeed / 2,
                  specialEasing: {
                    left: 'easeInQuint'
                  }
                });

                $("#box" + array[1]).animate({
                  left: $("#box" + array[0]).position().left + "px"
                }, {
                  duration: shuffleSpeed / 2,
                  specialEasing: {
                    left: 'easeInQuint'
                  }
                });


              }, shuffleSpeed);


              setTimeout(function() {
                clearInterval(interval);
                var flag = 0;
                $('div[id^="box"]').css("cursor", "pointer");
                setMessage("Cliquez sur la boîte ou se cache notre ami !")

                           box1.click(function() {
                  if (flag == 0) {
                    $(this).html('<img src="https://cdn.shopify.com/s/files/1/2653/6644/files/box_o_t-m.png" id="box_o_t" alt="">');
                    $(this).append(' <img src="https://cdn.shopify.com/s/files/1/2653/6644/files/box_o_b-m.png" id="box_o_b" alt="">');
                    if (ans == 1) {
                      kick.css({
                        left: $(this).position().left + 15 + "px"
                      });
                      flag = 1;
                      slide_out();
                    } else {
                      print_error();
                      flag = 1;
                    }
                  }
                });

                box2.click(function() {
                  if (flag == 0) {
                    $(this).html('<img src="https://cdn.shopify.com/s/files/1/2653/6644/files/box_o_t-m.png" id="box_o_t" alt="">');
                    $(this).append(' <img src="https://cdn.shopify.com/s/files/1/2653/6644/files/box_o_b-m.png" id="box_o_b" alt="">');
                    if (ans == 2) {
                      kick.css({
                        left: $(this).position().left + 15 + "px"
                      });
                      flag = 1;
                      slide_out();
                    } else {
                      flag = 1;
                      print_error();
                    }
                  }
                });

                $("#box3").click(function() {
                  if (flag == 0) {
                    $(this).html('<img src="https://cdn.shopify.com/s/files/1/2653/6644/files/box_o_t-m.png" id="box_o_t" alt="">');
                    $(this).append(' <img src="https://cdn.shopify.com/s/files/1/2653/6644/files/box_o_b-m.png" id="box_o_b" alt="">');
                    if (ans == 3) {
                      kick.css({
                        left: $(this).position().left + 15 + "px"
                      });
                      flag = 1;
                      slide_out();
                    } else {
                      flag = 1;
                      print_error();
                    }
                  }
                });


                function slide_out() {
                  setMessage("Fécilication ! vous avez gagné le code promo de -30% : CODEGAME30", "color_2");
                             kick.show();
                  kick.animate({
                    top: "95px"
                  }, {
                    duration: 500,
                    specialEasing: {
                      top: 'easeInQuint'
                    }
                  });

                }

                function print_error() {
                  setMessage("Vous avez perdu... ", "color_1");
                             }
                             }, nuberOfShuffels * shuffleSpeed);
                  n();
                });
              }
                         });
            }
                                   });



          });


          function setMessage(message, color) {
          messageBar.html(message).addClass(color);
        }
                     });
$(window).load(function() {

    $(document).on('mousemove', '.frame', function() {

        var element = {
            width: $(this).width(),
            height: $(this).height()
        };

        var mouse = {
            x: event.pageX,
            y: event.pageY
        };

        var offset = $(this).offset();

        var origin = {
            x: (offset.left + (element.width / 2)),
            y: (offset.top + (element.height / 2))
        };

        var trans = {
            left: (origin.x - mouse.x) / 2,
            down: (origin.y - mouse.y) / 2
        };

        var transform = ("scale(2,2) translateX(" + trans.left + "px) translateY(" + trans.down + "px)");

        $(this).children(".zoom").css("transform", transform);

    });
    $(document).on('mouseleave', '.frame', function() {
        $(this).children(".zoom").css("transform", "none");
    });
    $("#sortBy option").each(function(i) {
        var $bestSelling = $(this).attr("value");
        if ($bestSelling == "best-selling") {
            $(this).hide();
        }
    });
});
/* Header cart */


$('.header-cart-btn').hover(function() {   
  $('body').addClass('open-cart');
});               
$( ".mobileNavBar-link.cart-link" ).click(function(e) {
  e.preventDefault();
   $('body').toggleClass('open-cart');  
});
$( ".header-cart-btn" ).click(function(e) {
  e.preventDefault();
   $('body').toggleClass('open-cart');  
});
$( ".header-cart" ).mouseleave(function() {
   $('body').removeClass('open-cart');  
});
$( ".header-cart-close" ).click(function() {
   $('body').removeClass('open-cart');  
});


/* CGV */
  
if (window.matchMedia("(min-width: 768px)").matches) {
/* megamenus */
$(document).ready(function() {   
  $('.site-nav li').on('mouseenter', function() {
    $('.dropdown_container').removeClass('dropdown_open');
    var headerHeight = $('.cont-header').height();
    $this = $(this);  
    if(!$this.data('dropdown-rel')) {
      $('.dropdown_container').removeClass('dropdown_open');
    }   
    $('.size-format-true .dropdown').css('top', $('.cont-header').height());     
    if(typeof $this.data('dropdown-rel') !== "undefined") {
      $('.mega-menu-container .mega-menu').each(function(index){    
        if ($(this).data("dropdown") == $this.data('dropdown-rel')){
          $(this).addClass('dropdown_open');
        } 
      });
    }
});
  
$(window).scroll(function() {
   $('.size-format-true .dropdown').css('top', $('.cont-header').height());
});
  
if ($('.cont-header').hasClass('header-fixed-false')) {   
  $('.dropdown_container .dropdown').addClass('no-fixed');
}
  
$(".dropdown_container").mouseleave(function(e){
    var $this = $(this);

    var bottom = $this.offset().top + $this.outerHeight();

    if(e.pageY >= bottom){ $('.dropdown_container').removeClass('dropdown_open'); } 
  });
});
}
        

 

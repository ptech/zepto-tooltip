/*!
 * zepto-tooltip - v1.1.2 - 2013-08-19
 * https://github.com/ptech/zepto-tooltip
 *
 * Copyright (c) 2013 Present Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(win) {
    'use strict';

    var targets = $('[rel~=tooltip]'),
        target  = false,
        tooltip = false,
        tip;

    targets.on('mouseover', function() {
        target  = $(this);
        tip     = target.attr('title');
        tooltip = $('<div class="tooltip"></div>');

        if (!tip || tip === '') {
            return false;
        }

        target.removeAttr('title');
        tooltip.css('opacity', 0).html(tip).appendTo('body');

        var initTooltip = function() {
            if ($(win).width() < tooltip.width() * 1.5) {
                tooltip.css('max-width', $(win).width() / 2);
            } else {
                tooltip.css('max-width', 340);
            }

            var posLeft = target.offset().left + (target.width() / 2) - (tooltip.width() / 2),
                posTop = target.offset().top - tooltip.height() - 20;

            if (posLeft < 0) {
                posLeft = target.offset().left + target.width() / 2 - 20;
                tooltip.addClass('left');
            } else {
                tooltip.removeClass('left');
            }

            if (posLeft + tooltip.width() > $(win).width()) {
                posLeft = target.offset().left - tooltip.width() + target.width() / 2 + 20;
                tooltip.addClass('right');
            } else {
                tooltip.removeClass('right');
            }

            if (posTop < 0) {
                posTop = target.offset().top + target.height();
                tooltip.addClass('top');
            } else {
                tooltip.removeClass('top');
            }

            tooltip.css({
                left: posLeft,
                top: posTop
            }).animate({
                translateY: '10px',
                opacity: 1
            }, 50);
        };

        initTooltip();
        $(win).resize(initTooltip);

        var removeTooltip = function() {
            tooltip.animate({
                translateY: '-10px',
                opacity: 0
            }, 50, 'linear', function() {
                $(this).remove();
            });

            target.attr('title', tip);
        };

        target.on('mouseout', removeTooltip);
        tooltip.on('click', removeTooltip);
    });
}(window));

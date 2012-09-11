(function(win) {
    var targets = $('[rel~=tooltip]'),
        target  = false,
        tooltip = false,
        tip;

    targets.bind('mouseover', function() {
        target  = $(this);
        tip     = target.attr('title');
        tooltip = $('<div class="tooltip"></div>');

        if (!tip || tip === '') {
            return false;
        }

        target.removeAttr('title');
        tooltip.css('opacity', 0).html(tip).appendTo('body');

        var init_tooltip = function() {
            if ($(win).width() < tooltip.width() * 1.5) {
                tooltip.css('max-width', $(win).width() / 2);
            } else {
                tooltip.css('max-width', 340);
            }

            var pos_left = target.offset().left + (target.width() / 2) - (tooltip.width() / 2),
                pos_top = target.offset().top - tooltip.height() - 20;

            if (pos_left < 0) {
                pos_left = target.offset().left + target.width() / 2 - 20;
                tooltip.addClass('left');
            } else {
                tooltip.removeClass('left');
            }

            if (pos_left + tooltip.width() > $(win).width()) {
                pos_left = target.offset().left - tooltip.width() + target.width() / 2 + 20;
                tooltip.addClass('right');
            } else {
                tooltip.removeClass('right');
            }

            if (pos_top < 0) {
                pos_top = target.offset().top + target.height();
                tooltip.addClass('top');
            } else {
                tooltip.removeClass('top');
            }

            tooltip.css({
                left: pos_left,
                top: pos_top
            }).animate({
                translateY: '10px',
                opacity: 1
            }, 50);
        };

        init_tooltip();
        $(win).resize(init_tooltip);

        var remove_tooltip = function() {
            tooltip.animate({
                translateY: '-10px',
                opacity: 0
            }, 50, 'linear', function() {
                $(this).remove();
            });

            target.attr('title', tip);
        };

        target.bind('mouseout', remove_tooltip);
        tooltip.bind('click', remove_tooltip);
    });
}(window));

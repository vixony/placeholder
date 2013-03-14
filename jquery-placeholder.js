/**
 * Created with JetBrains WebStorm.
 * Author: Shiming
 * Date: 2013-03-14
 * Time: 23:38:23
 * version: 0.1
 * create this jQuery plugin for ie6,7,8 to fix placeholder attribute
 */
(function($){
    var Placeholder,
        inputHolder = 'placeholder' in document.createElement('input') && false,
        textareaHolder = 'placeholder' in document.createElement('textarea') && false;

    Placeholder = {
        ini:function () {
            if (inputHolder && textareaHolder) {
                return false;
            }
            this.el = $(':text[placeholder],:password[placeholder],textarea[placeholder]');
            this.setHolders();
        },
        setHolders: function(obj){
            var el = obj ? $(obj) : this.el;
            if (el) {
                var self = this;
                el.each(function() {
                    var span = $('<label />');
                    span.text( $(this).attr('placeholder') );
                    span.css({
                        color: '#999',
                        fontSize: $(this).css('fontSize'),
                        fontFamily: $(this).css('fontFamily'),
                        fontWeight: $(this).css('fontWeight'),
                        position: 'absolute',
                        top: $(this).offset().top,
                        left: $(this).offset().left,
                        width: $(this).width(),
                        height: $(this).height(),
                        lineHeight: $(this).height() + 'px',
                        textIndent: $(this).css('textIndent'),
                        paddingLeft: $(this).css('borderLeftWidth'),
                        paddingTop: $(this).css('borderTopWidth'),
                        paddingRight: $(this).css('borderRightWidth'),
                        paddingBottom: $(this).css('borderBottomWidth'),
                        display: 'inline',
                        overflow: 'hidden'
                    })
                    if (!$(this).attr('id')) {
                        $(this).attr('id', self.guid);
                    }
                    span.attr('for', $(this).attr('id'));
                    $(this).after(span);
                    self.setListen(this, span);
                })
            }
        },
        setListen : function(el, holder) {
            if (!inputHolder || !textareaHolder) {
                el = $(el);
                el.bind('keydown', function(e){
                        if (el.val() != '') {
                            holder.hide(0);
                        } else if ( /[a-zA-Z0-9`~!@#\$%\^&\*\(\)_+-=\[\]\{\};:'"\|\\,.\/\?<>]/.test(String.fromCharCode(e.keyCode)) ) {
                            holder.hide(0);
                        } else {
                            holder.show(0);
                        }
                });
                el.bind('keyup', function(e){
                        if (el.val() != '') {
                            holder.hide(0);
                        } else {
                            holder.show(0);
                        }

                })
            }
        },
        guid: function() {
            var t = 'xxxx-xxxy-xxxx-xxxx';
            return t.replace(/[xy]/, function(l) {
                if (l== 'x') {

                } else if (l = 'y') {

                }
            })
        }
    }

    $.fn.placeholder = function () {
        if (imputHolder && textareaHolder) {
            return this;
        }
        Placeholder.setListen(this);
    }

    $.placeholder = Placeholder;

})(jQuery)
/*!
 * Modalizer.js v1.0.1 modalizerjs.jlgarridol.com
 * Copyright 2020 José Luis Garrido-Labrador
 * Licensed under MIT (https://github.com/jlgarridol/modalizerjs/blob/main/LICENSE)
 */

let MOD_howManyModals = 0;
let MOD_modalz = 9999;
let MOD_animate = "";
let MOD_oc = null;

let MOD_optionable = null;
let MOD_actioned = false;

if (typeof $().modal != 'function') {  
    // jQuery is not loaded
    console.error("Bootstrap modals not loaded")    
}else{
    $(document).ready(function(){
        /**
         * Launch modals
         */
        $(".modalinit").each(function(){
            $(this).click(function(){
                let btn = $(this);
                let modal = $("#"+btn.data('modal'));
                if(modal.length != 0)
                    launchModal(modal);
            })
        });

        /**
         * Add funcionalitiy for all nextaction blocks
         */
        $(".nextaction").each(function(){
            $(this).click(function(){
                let btn = $(this);
                let stack = eval(MOD_CURRENTMODAL.peek().data('stack'));
                let nexttext = btn.data('next') || "";
                let dialog = btn.closest("div.modal-dialog");
                MOD_optionable = {dialog: dialog, nexttext: nexttext, stack: stack, next:true};
                MOD_actioned = true;
                boostrapAnimation(dialog, "fadeOutLeftBig");
                
            });
        });
    
        /**
         * Add funcionalitiy for all nextaction blocks
         */
        $(".beforeaction").each(function(){
            $(this).click(function(){
                let btn = $(this);
                let stack = eval(MOD_CURRENTMODAL.peek().data('stack'));
                let before = stack.pop()
                let dialog = btn.closest("div.modal-dialog");
                MOD_optionable = {before: before, dialog: dialog, next:false};
                MOD_actioned = true;
                boostrapAnimation(dialog, "fadeOutRightBig");                
            });            
        });

        // Finish animation for modal dialog
        $(".modal-dialog.animate__animated").each(function(){
            $(this).on('animationend', function(e) {
                if (MOD_optionable != null && MOD_actioned){
                    MOD_actioned = false;
                    MOD_optionable.dialog.hide();

                    if(MOD_optionable.next){
                        MOD_optionable.stack.push(MOD_optionable.dialog.attr("id"));
                        if(MOD_optionable.nexttext != ""){
                            let next = $("#"+MOD_optionable.nexttext);
                            boostrapAnimation(next, "fadeInRightBig"); 
                            next.show();
                        }else{     
                            resetmodals();          
                        }
                    }else{
                        if(MOD_optionable.before != null){
                            let before = $("#"+MOD_optionable.before)
                            boostrapAnimation(before, "fadeInLeftBig");
                            before.show();
                        }else{
                            MOD_optionable.dialog.show();
                            resetmodals();
                        }
                    }

                }
                
            })
        })
    
        // Add a show and bs function for each modal
        $(".modal.modalizer").each(function(){
            $(this).on("show.bs.modal", function(){
                let it = $(this);
                
                if(!it.hasClass("modal-optionable")){
                    // If modal is already open don't add in how_manyModals
                    $("#MOD_supreme-container").addClass("modal-open");
                    it.css("z-index", ++MOD_modalz);          
                }
            });
    
            $(this).on("hide.bs.modal", function(e){
                e.preventDefault();
                let it = $(this);
                var animation = it.data("animate-out") || null;
                if(animation != null){
                    it.addClass("animate__"+animation);
                }
                MOD_animate = animation;
                MOD_oc = it;
                it.removeClass("show");
                MOD_modalz--;

                if($('.modal[style*="display: block"]').length > 1){
                    $("#MOD_supreme-container").addClass("modal-open");          
                }else{
                    $("#MOD_supreme-container").removeClass("modal-open");
                    $("body").removeClass("modal-open");
                }    
                
            });
        })
    
        // Close modal function
        $(".closemodal").each(function(){
            $(this).click(function(){
                let modal = $(this).closest("div.modal");
                modal.modal("hide");
                resetmodals();  
            });        
        });

        //Finished animation
        $(".modal.modalizer.animate__animated").each(function(){
            $(this).on('animationend', function(e) {
                let it = $(this);
                if (MOD_animate != null)
                    it.removeClass("animate__"+MOD_animate);
                if(MOD_oc != null){
                    MOD_oc.css("display","none");
                    if (MOD_oc.hasClass("modal-optionable")){
                        afterresetmodal(MOD_oc);
                    }
                }
                MOD_oc = null;
                MOD_animate = null;
            })
        });
    
    });  
    
}


function boostrapAnimation(modal, animation){
    var cls = modal.attr("class").split(" ");
    cls.pop();
    cls.push("animate__"+animation);
    modal.attr("class", cls.join(" "));
}

function launchModal(modal){
    var animation = modal.data("animate-in") || null;
    if(animation != null){
        modal.addClass("animate__"+animation);
    }
    if(modal.hasClass("show")){ 
        modal.removeClass("show");
        setTimeout(function() {
            modal.css("z-index", ++MOD_modalz);
            modal.addClass("show");
        }, 500);
    }else{
        setCurrentModal(modal);
        if(!modal.hasClass("modal-optionable"))
            MOD_howManyModals++;
        modal.modal("show");
    }
    modal.css("display","block");
    setTimeout(function(){
        if(animation != null){
            modal.removeClass("animate__"+animation);
        }
    }, 1000);
    $("#MOD_supreme-container").addClass("modal-open");
    
}

function resetmodals(){
    let curmodal = MOD_CURRENTMODAL.pop();
    curmodal.modal("hide");
}

function afterresetmodal(curmodal){
    let stack = eval(curmodal.data('stack'));
    if(stack != null){
        stack.clean();
    }
    let loop = 0;
    let anim = curmodal.data('animate-in') || null;
    curmodal.children('div').each(function(){
        let modal = $(this);
        boostrapAnimation(modal, "fadeInRight");
        if(loop == 0){
            modal.css("display", "");
            if(anim != null)
                boostrapAnimation(modal, anim)
        }else{
            modal.css("display", "none");
        }
        loop++;        
    });
}

function setCurrentModal(modal){
    MOD_CURRENTMODAL.push(modal);
}

// Utils

class MOD_Stack {
    constructor(){
        this.items = [];
    }

    push(element) 
    { 
        // push element into the items 
        this.items.push(element); 
    } 

    pop() 
    { 
        // return top most element in the stack 
        // and removes it from the stack 
        // Underflow if stack is empty 
        if (this.isEmpty()) 
            return null; 
        return this.items.pop(); 
    } 

    peek() 
    { 
        // return the top most element from the stack 
        // but does'nt delete it. 
        return this.items[this.items.length - 1]; 
    } 

    isEmpty() 
    { 
        // return true if stack is empty 
        return this.items.length == 0; 
    } 

    clean(){
        this.items = [];
    }

}

function removeItemOnce(arr, value) { 
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

// Current modal stack
const MOD_CURRENTMODAL = new MOD_Stack();
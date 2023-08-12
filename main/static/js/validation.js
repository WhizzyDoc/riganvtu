$(document).ready(function() {
    $('.openav').on('click', function() {
        $('.nav').toggleClass('w-hide');
    });
    // form input design
    $('input[type=email]').siblings('.icons').html(`<span class="icon2 fa fa-envelope"></span>`);
    $('input[type=text]').siblings('.icons').html(`<span class="icon2 fa fa-user"></span>`);
    $('input[type=tel]').siblings('.icons').html(`<span class="icon2 fa fa-phone"></span>`);
    $('input[type=password]').siblings('.icons').html(`<span class="icon2 fa fa-eye" id="pass"></span>`);
    
    $('input[type=password]').siblings('.icons').click(function() {
            var typ = $(this).siblings('input').attr('type');
            if(typ == 'password') {
                $(this).siblings('input').attr('type', 'text');
                $(this).html(`<span class="icon2 fa fa-eye-slash" id="pass"></span>`)
            }
            else {
                $(this).siblings('input').attr('type', 'password');
                $(this).html(`<span class="icon2 fa fa-eye" id="pass"></span>`)
            }
    });
    // Form inputs validation
    
    // confirm password
    $('#cpassword').on('input', function() {
        var pass = $('#new_password').val();
        var cpass = $(this).val();
        if (pass === cpass) {
            $(this).siblings('.icons').html(`<span class="icon2 fa fa-eye" id="pass"></span>`);
            $('.cpass-error').html(``);
        }
        else {
            $(this).siblings('.icons').html(`<span class="icon1 fa fa-warning" id="pass"></span>`);
            $('.cpass-error').html(`<i class="fa fa-warning"></i> Passwords don\'t match.`);
        }
    })
})

// registration password
const indicator = document.querySelector(".indicator");
         const input = document.querySelector("#new_password");
         const weak = document.querySelector(".weak");
         const medium = document.querySelector(".medium");
         const strong = document.querySelector(".strong");
         const text = document.querySelector(".text");
         let regExpWeak = /[a-z]/;
         let regExpMedium = /\d+/;
         let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
function trigger(){
           if(input.value != ""){
                indicator.style.display = "block";
                indicator.style.display = "flex";
                if(input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong)))no=1;
                if(input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong))))no=2;
                if(input.value.length >= 6 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong))no=3;
                
                if(no==1){
                weak.classList.add("active");
                strong.classList.remove("active");
                medium.classList.remove("active");
                text.style.display = "block";
                text.textContent = "Your password is too week";
                text.classList.add("weak");
                text.classList.remove("strong");
                text.classList.remove("medium");
                }

                else if(no==2){
                medium.classList.add("active");
                strong.classList.remove("active");
                text.textContent = "Your password is medium";
                text.classList.add("medium");
                text.classList.remove("weak");
                text.classList.remove("strong");
                }
                else if(no==3){
                weak.classList.add("active");
                medium.classList.add("active");
                strong.classList.add("active");
                text.textContent = "Your password is strong";
                text.classList.add("strong");
                text.classList.remove("weak");
                text.classList.remove("medium");
                }
                else{
                strong.classList.remove("active");
                medium.classList.remove("active");
                weak.classList.remove("active");
                text.classList.remove("weak");
                text.classList.remove("strong");
                text.classList.remove("medium");
                }

            }
            else{
                indicator.style.display = "none";
                text.style.display = "none";
           }
}
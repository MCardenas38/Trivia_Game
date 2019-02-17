$( document ).ready(function() { 
    var trivia_questions = [
        {
            q: "What was the first web bowser?",
            a: "WorldWideWide",
            a1: "Netscape",
            a2: "NeXT",
            a3: "Mosaic",
        },
        {
            q: "A grand price fxing scheme that took place in between 1998-2002 invovled over a dozen makers, of which PC component?",
            a: "DRAM",
            a1: "HDDs",
            a2: "Displays",
            a3: "Motherboards",
        },
        {
            q: "What was the first handheld game console to ship with a color display?",
            a: "Atari Lynx",
            a1: "Gameboy Color",
            a2: "Sega Game Gear",
            a3: "Nat Geo Pocket Color",
        },
        {
            q: "What was the first cross-platform web browser (circa 1993)?",
            a: "Mosaic",
            a1: "Cello",
            a2: "Nexus",
            a3: "Internet Explorer",
        },
        {
            q: "Released in 1989, the Psion MC-400 laptops was way ahead of its time, it includes all of these features except one...",
            a: "Wifi",
            a1: "SSD Storage",
            a2: "60-hour battery life",
            a3: "A touchpad",
        }
    ];

    var time= 10;
    var user_answer;
    var index= 0;
    var started= false;
    var correct= 0;

    function countdown(){
        //add display here
        $("#timer").text(time)
        if(started===false){
            started= true;
            question_rest();
        }
        if(time===0){
            timer_up();
            if(index===trivia_questions.length){
                done();
                index=0;
            }
        }
        --time;
    }

    $(document).on("click", ".ans",function(){
        $(".ans").css("font-weight","normal");
        $(this).css("font-weight","bold");
        user_answer= $(this).data("string");
    });

    $(document).on("click", "#reset",function(){
        shuffle(trivia_questions);
        index=0;
        correct=0;
        time= 10;
        started= false;
        $("#main-content").empty();
        $("#main-content").append($("<p>").attr("id","timer").attr("class","ans"));
        $("#main-content").append($("<p>").attr("id","question").attr("class","ans"));
        $("#main-content").append($("<p>").attr("id","1").attr("class","ans"));
        $("#main-content").append($("<p>").attr("id","2").attr("class","ans"));
        $("#main-content").append($("<p>").attr("id","3").attr("class","ans"));
        $("#main-content").append($("<p>").attr("id","4").attr("class","ans"));
    });

    function shuffle(array){
        array.sort(function() { return 0.5 - Math.random() });
    }

    function question_rest(){
        var temp_array= [];
        temp_array.push(trivia_questions[index].a,trivia_questions[index].a1,trivia_questions[index].a2,trivia_questions[index].a3);
        shuffle(temp_array);
        $("#question").text(trivia_questions[index].q);
        $("#1").text(temp_array[0]);
        $("#1").data("string",temp_array[0]);
        $("#2").text(temp_array[1]);
        $("#2").data("string",temp_array[1]);
        $("#3").text(temp_array[2]);
        $("#3").data("string",temp_array[2]);
        $("#4").text(temp_array[3]);
        $("#4").data("string",temp_array[3]);
    }

    function done(){
            $("#main-content").empty();
            $("#main-content").append($("<br>"));
            $("#main-content").append($("<h1>").attr("class","done").text("Your Score:"));
            $("#main-content").append($("<p>").attr("class","done").text(correct/trivia_questions.length*100+"%"));
            $("#main-content").append($("<button>").attr("id","reset").text("Retry?"));
            clearInterval(interval_id); 
    }


    function timer_up(){
        clearInterval(interval_id);
        if(index<trivia_questions.length){
            check_ans();
            setTimeout(function() {
                $(".ans").css("font-weight","normal");
                $(".ans").css("color","black");
            }, 2000)
            time= 11;
            started=false;
            ++index;
            setTimeout(function(){
                interval_id= setInterval(countdown,1000);
            }, 2000);
        }
    }

    function check_ans(){
        for(var i=1;i<=4;++i){
            var value= $("#"+i).data("string");
            if(user_answer===value){
                $("#"+i).css("font-weight","bold");
                $("#"+i).css("color","red");
            }
            if(trivia_questions[index].a===value){
                $("#"+i).css("font-weight","bold");
                $("#"+i).css("color","green");
            }
        }
        if(trivia_questions[index].a===user_answer){
            ++correct;
        }
    }

    shuffle(trivia_questions);
    var interval_id= setInterval(countdown,1000);
});

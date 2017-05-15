var valores = {java: 94, javaS:70, py:40, htm: 78, sql:65};
var num=0;



$(function(){
	$('.skills-area').hover(
    		function recordVal()
    		{
    			num+=1;
    		}
    );

    $('.skills-area').hover(
    		function move()
    		{
    			if(num%2 !== 0)
    			{
    				//console.log("moving");
				    var java = document.getElementsByClassName("Java")[0];
				    var width = 5;
				    var id = setInterval(frame, 10);
				    function frame()
				    {
				        if (width >= 96) {
				            clearInterval(id);
				        }
				        else {
				            width++;
				            java.style.width = width + '%';
				        }
				    }
    			}

			}
	);

	$('.skills-area').hover(
    		function move()
    		{
    			if(num%2 !== 0)
    			{
    				//console.log("moving");
				    var javaS = document.getElementsByClassName("JavaScript")[0];
				    var width = 5;
				    var id = setInterval(frame, 10);
				    function frame()
				    {
				        if (width >= 88) {
				            clearInterval(id);
				        }
				        else {
				            width++;
				            javaS.style.width = width + '%';
				        }
				    }
    			}

			}
	);

	$('.skills-area').hover(
    		function move()
    		{
    			if(num%2 !== 0)
    			{

    				//console.log("moving");
				    var py = document.getElementsByClassName("Python")[0];
				    var width = 5;
				    var id = setInterval(frame, 10);
				    function frame()
				    {
				        if (width >= 40) {
				            clearInterval(id);
				        }
				        else {
				            width++;
				            py.style.width = width + '%';
				        }
				    }

    			}
			}
	);

	$('.skills-area').hover(
    		function move()
    		{
    			if(num%2 !== 0)
    			{
    				//console.log("moving");
				    var htm = document.getElementsByClassName("HtmlyCss")[0];
				    var width = 5;
				    var id = setInterval(frame, 10);
				    function frame()
				    {
				        if (width >= 78) {
				            clearInterval(id);
				        }
				        else {
				            width++;
				            htm.style.width = width + '%';
				        }
				    }

    			}
			}
	);

	$('.skills-area').hover(
    		function move()
    		{
    			if(num%2 !== 0)
    			{
    				//console.log("moving");
				    var sql = document.getElementsByClassName("SQL")[0];
				    var width = 5;
				    var id = setInterval(frame, 10);
				    function frame()
				    {
				        if (width >= 65) {
				            clearInterval(id);
				        }
				        else {
				            width++;
				            sql.style.width = width + '%';
				        }
				    }
    			}

			}
	);

    window.isHovering = function (selector) {
        return $(selector).data('hover')?true:false; //check element for hover property
    }
});

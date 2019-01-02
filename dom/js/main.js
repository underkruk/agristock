;(function(){
    //Find an element by id
    var app = document.getElementById('app'),
        h1 = document.getElementById('title'),
        btn1 = document.getElementById('btn1'),
        btn2 = document.getElementById('btn2');

    //Find an elements by TagName
    var elementsByTagName = document.getElementsByTagName('h2');

    //Find elements by class name
    var elementsByClassName = document.getElementsByClassName('title');

    //Methods
    h1.innerHTML = "<span>Document Object Model</span>";
    h1.attribute = "data-id";
    h1.setAttribute('class', 'header');
    h1.style.color = "green";
    h1.style['background-color'] = "#f5f0f0";
    h1.style['padding'] = "20px";


    //Adding and Deleting Elements
    var div = document.createElement('div'),
        p = document.createElement('p'),
        a = document.createElement('a'),
        span = document.createElement('span');
        a.innerText = 'Google.com';
        a.setAttribute('href', 'https://google.com');
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none';
        p.appendChild(a);
        div.appendChild(p);

        //document.write("<div>Hello</div>")  //Write into the HTML output stream
        //app.removeChild(div);
        //p.replaceChild(span); //todo разобраться как работает

    btn1.onclick = function(){
        app.appendChild(div);
    };
    btn2.onclick = function(){
        app.removeChild(div);
    };

    if(elementsByClassName.length > 0){
        for(var i=0; i< elementsByClassName.length; i++){
            elementsByClassName[i].style['color'] = "blue";
        }
    }

    //mouse events
    var childElemen = document.getElementById('child');

    childElemen.addEventListener('mousedown', function(){
        console.log('click to red');
    });
    childElemen.addEventListener('mouseup', function(){
        console.log('click out yellow');
    });
    childElemen.addEventListener('mouseover', function(){
        console.log('mouse over');
    });
    childElemen.addEventListener('mouseout', function(){
        console.log('mouse out');
    });

    document.getElementById('moveByDiagonal').addEventListener('click', function(){
        moveChildFigure('moveByDiagonal');
    });

    document.getElementById('moveByWidth').addEventListener('click', function(){
        moveChildFigure('moveByWidth');
    });

    document.getElementById('moveByDiagonalBack').addEventListener('click', function(){
        moveChildFigure('moveByDiagonalBack');
    });

    document.getElementById('backToStartPosition').addEventListener('click', function(){
        moveChildFigure();
    });

    function moveChildFigure(position){
       var pos =0, top, left;
       var id = setInterval(mySetInterval,1);
       var child = document.getElementById('child'),
           parent = document.getElementById('parent');
        function mySetInterval(){
            if(pos == 350){
                clearInterval(id);
            }else{
                pos++;
                switch(position){
                    case 'moveByWidth':
                        top = '0px';
                        left = pos + 'px';
                     break;

                    case 'moveByDiagonalBack':
                        top = (pos) + 'px';
                        left = (350-pos) + 'px';
                        break;
                    case "moveByDiagonal":
                        top = pos + 'px';
                        left = pos + 'px';
                        break;
                    default:
                        clearInterval(id);
                        top = '0px';
                        left = '0px';
                }
                child.style.top = top;
                child.style.left = left;
            }
        }
    }

    //change input
    var inputChange = document.getElementById('inputChange'),
        result = document.getElementById('result');
    document.getElementById('clearText').addEventListener('click', function(){
        inputChange.value = '';
        result.innerText = '';
    });

    inputChange.addEventListener('change', function(){
        result.innerText = event.target.value;
    });

    inputChange.addEventListener('focus', function(){
        var node = event.target;
            node.style.background = 'grey';
    });

    window.addEventListener("resize", function(){
        console.log(event.currentTarget.innerHeight,event.currentTarget.innerWidth );
    });

    //javascript events

})();
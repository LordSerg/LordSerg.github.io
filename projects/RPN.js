/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 700;
/*
canvas.addEventListener("click", function(event){
    let x = event.offsetX;
    let y = event.offsetY;


    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2)
    ctx.fill();
    ctx.stroke();
});
*/

function show_stack(arr, name, x, y, h, w, color)
{
    ctx.font = "20px serif";
    ctx.fillStyle = "white";
    ctx.fillText(name,x+w/2-name.length*5,y+20);
    let h_el = 35;
    let shift = y+h-h_el*arr.length;
    for(let i=0;i<arr.length; i++)
    {
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = color;
        ctx.rect(x,shift+i*h_el,w,h_el);
        ctx.stroke();
        ctx.font = "20px serif";
        ctx.fillStyle = "white";
        ctx.fillText(arr[arr.length-1-i],x+w/2-arr[arr.length-1-i].length*5,shift+i*h_el+h_el/2);
    }
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = color;
    ctx.rect(x,y,w,h);
    ctx.stroke();
}
function show_input(arr, i)
{
    ctx.font = "40px serif";
    ctx.fillStyle = "white";
    ctx.fillText(arr.join(' '),canvas.width/2-arr.join(' ').length*10,50);
    //ctx.beginPath();
    //canvas_arrow(ctx,canvas.width/2-(arr.join(' ').length-2*i)*11,100,canvas.width/2-(arr.join(' ').length-2*i)*11,70);
    //ctx.stroke();
    ctx.beginPath()
    ctx.lineWidth = "4";
    ctx.strokeStyle = "red";
    ctx.rect(canvas.width/2-arr[i].length*10-20,100,40+arr[i].length*20,70);
    ctx.stroke();
    ctx.fillText(arr[i],canvas.width/2-arr[i].length*10,150);
}
function canvas_arrow(context, fromx, fromy, tox, toy) 
{
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }
//let arr = [];
//arr.push("(","5789","+","700",")","^","2","-", "130");
//show_stack(arr,"answer", 50,50,400,300,"red");
//show_stack(arr,"temporary", 400,50,400,300,"green");
  
//canvas.addEventListener('click', eventHandler0);
//canvas.addEventListener('click', eventHandler1);
//ctx.clearRect(0,0,canvas.width,canvas.height);

//input array of elements
const arr = [];
arr.push("(","5","+","7",")","^","2","-","13");

//stacks:
const tmp = [];
const ans = [];
let i=0;
function step()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(i<arr.length)
    {
        is_add_iterator = false;
        if(arr[i][0]>='0'&&arr[i][0]<='9')
        {//number
            ans.push(arr[i]);
            is_add_iterator = true;
        }
        else if(arr[i]=="+"||arr[i]=="-")//preority = 3
        {//operations
            if(tmp.length>0 && (tmp[tmp.length-1] == "+" || tmp[tmp.length-1] == "-" || tmp[tmp.length-1] == "/" || tmp[tmp.length-1] == "*" || tmp[tmp.length-1] == "^")) 
            {
                ans.push(tmp.pop());
            }
            else
            {
                tmp.push(arr[i]);
                is_add_iterator= true;
            }
        }
        else if(arr[i]=="*"||arr[i]=="/")//preority = 2
        {//operations
            if(tmp.length>0 && (tmp[tmp.length-1] == "/" || tmp[tmp.length-1] == "*" || tmp[tmp.length-1] == "^"))
            {
                ans.push(tmp.pop());
            }
            else
            {
                tmp.push(arr[i]);
                is_add_iterator = true;
            }
        }
        else if(arr[i]=="^")//preority = 1
        {//operations
            if(tmp.length>0 && tmp[tmp.length-1] == "^")
            {
                ans.push(tmp.pop());
            }
            else
            {
                tmp.push(arr[i]);
                is_add_iterator = true;
            }
        }
        else if(arr[i]=="("||arr[i]==")")//preority = 0
        {//brackets
            if (arr[i] == "(")
            {
                tmp.push("(");
                is_add_iterator=true;
            }
            else if (arr[i] == ")")
            {
                if(tmp[tmp.length-1] != "(")
                {
                    ans.push(tmp.pop());
                }
                else
                {
                    tmp.pop();
                    is_add_iterator = true;
                }
                //console.log("i = "+i+"; ans = " + ans+"; tmp = " + tmp);
            }
        }
        if(is_add_iterator) i++;
    }
    else
    {
        if(tmp.length>0)
            ans.push(tmp.pop());
    }
    show_stack(ans,"answer", 50,280,400,300,"green");
    show_stack(tmp,"temporary", 400,280,400,300,"yellow");
    show_input(arr, i);
}
canvas.addEventListener('click',step)
/*
for(let i=0; i<arr.length; i++)
{
    if(arr[i][0]>='0'&&arr[i][0]<='9')
    {//number
        ans.push(arr[i]);
        console.log("i = "+i+"; ans = " + ans+"; tmp = " + tmp);
    }
    else if(arr[i]=="+"||arr[i]=="-")//preority = 3
    {//operations
        while(tmp.length>0 && (tmp[tmp.length-1] == "+" || tmp[tmp.length-1] == "-" || tmp[tmp.length-1] == "/" || tmp[tmp.length-1] == "*" || tmp[tmp.length-1] == "^")) 
        {
            ans.push(tmp.pop());
        }
        tmp.push(arr[i]);
        console.log("i = "+i+"; ans = " + ans+"; tmp = " + tmp);
    }
    else if(arr[i]=="*"||arr[i]=="/")//preority = 2
    {//operations
        while(tmp.length>0 && (tmp[tmp.length-1] == "/" || tmp[tmp.length-1] == "*" || tmp[tmp.length-1] == "^"))
        {
            ans.push(tmp.pop());
        }
        tmp.push(arr[i]);
        console.log("i = "+i+"; ans = " + ans+"; tmp = " + tmp);
    }
    else if(arr[i]=="^")//preority = 1
    {//operations
        while(tmp.length>0 && tmp[tmp.length-1] == "^")
        {
            ans.push(tmp.pop());
        }
        tmp.push(arr[i]);
        console.log("i = "+i+"; ans = " + ans+"; tmp = " + tmp);
    }
    else if(arr[i]=="("||arr[i]==")")//preority = 0
    {//brackets
        if (arr[i] == "(")
            tmp.push("(");
        else if (arr[i] == ")")
        {
            while (tmp[tmp.length-1] != "(")
            {
                ans.push(tmp.pop());
                //console.log("l = "+tmp.length);
            }
            tmp.pop();
            console.log("i = "+i+"; ans = " + ans+"; tmp = " + tmp);
        }
    }
}
while(tmp.length>0)
{
    ans.push(tmp.pop());
}
console.log(ans);
*/
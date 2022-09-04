const section = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelectorAll('.main-content');

function PageTransitions()
{
    for(let i=0;i<sectBtn.length;i++)
    {
        sectBtn[i].addEventListener('click',()=>
        {
            let curbtn=document.querySelectorAll('.active-btn');
            curbtn[0].className=curbtn[0].className.replace('active-btn','');
            sectBtn[i].className+='active-btn';
        });
    }
}
PageTransitions();
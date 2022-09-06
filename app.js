const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

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
    allSections.addEventListener('click', (e)=>
    {
        const id = e.target.dataset.id;
        if(id)
        {
            //sectBtns.forEach((btn)=>
            //{
            //    btn.classList.remove('active');
            //});
            //e.target.classList.add('active');
            //hide other sections
            sections.forEach((section)=>
            {
                section.classList.remove('active');
            });
            const element = document.getElementById(id);
            element.classList.add('active');
        }
    });

    //change theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',()=>
    {
        let element=document.body;
        element.classList.toggle('light-mode')
    })
}

PageTransitions();
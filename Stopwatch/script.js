let displaytime=document.querySelector('.displaytime');
let stop=document.getElementById('stop');
let start=document.getElementById('start');
let reset=document.getElementById('reset');
let msec=0;
let sec=0;
let min=0;
let timerid=null;
start.addEventListener('click',function()
{
    if(timerid!=null)
    {
        clearInterval(timerid);
    }
    timerid=setInterval(starttimer,10);
})
stop.addEventListener('click',function()
{
    clearInterval(timerid);
})
reset.addEventListener('click',function()
{
    clearInterval(timerid);
    displaytime.innerHTML=`00:00:00`;
    msec=sec=min=0;
})
function starttimer()
{
  msec++;
  if(msec==100)
  {
    msec=0;
    sec++;
    if(sec==60)
    {
        sec=0;
        min++;
    }
  }
  
  let msecstring=msec<10?`0${msec}`:msec;
  let secstring=sec<10?`0${sec}`:sec;
  let minstring=sec<10?`0${min}`:min;
  displaytime.innerHTML=`${minstring}:${secstring}:${msecstring}`;
}
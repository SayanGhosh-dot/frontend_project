let qrtext=document.getElementById('qr-text');
let sizes=document.getElementById('size');
let genratebtn=document.getElementById('Generatebtn');
let downloadbtn=document.getElementById('Downloadbtn');
let qrcontainer=document.getElementById('qr-body');
let size=sizes.value;
genratebtn.addEventListener('click',(e)=>
{
    e.preventDefault();
    isemptyinput();
})
sizes.addEventListener('change',(e)=>
{
    size=e.target.value;
    isemptyinput();
})
function isemptyinput()
{
    qrtext.value.length>0?generateqrcode():alert("enter the text or url to generate your qr code");

}
function generateqrcode()
{
    qrcontainer.innerHTML = "";
    new QRCode(qrcontainer,
        {
            text:qrtext.value,
            height:size,
            width:size,
            colorLight:"#fff",
            colorDark:"#000",
        }
    );
}


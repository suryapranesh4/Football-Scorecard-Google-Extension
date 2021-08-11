const template = document.createElement('template');
template.innerHTML = `
    <style>
        section.triangleGrid {
            display: grid;
            grid-template-columns: repeat(3, 33%);
            grid-template-rows: repeat(3, 33%);
            justify-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            
            /* centering */
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        
        .scene {
            position: relative;
            width: var(--cotetriangle);
            height: var(--cotetriangle);
            grid-row: 2/3;
            grid-column: 2/3;
            -webkit-perspective: 500px;
                    perspective: 500px;
        }
        
        .triangle {
            width: inherit;
            height: inherit;
            position: relative;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-animation: rotateTriangle 10s linear infinite;
                    animation: rotateTriangle 10s linear infinite;  
        }
        
        .triangle-face {
            width: inherit;
            height: inherit;
            position: absolute;
            display: flex;
            flex-flow : column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        
        .triangle-face-front {
            background: rgb(2,0,36);
            background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 12%, rgba(5,32,70,1) 100%);
            color : white;
            -webkit-transform: translate3d(0, 0, var(--translationDistance));
                    transform: translate3d(0, 0, var(--translationDistance));
        }
        
        .triangle-face-left {
            background: rgb(2,0,36);
            background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 12%, rgba(5,32,70,1) 100%);
            color : white;
            -webkit-transform: rotateY(-120deg) translate3d(0, 0, var(--translationDistance));
                    transform: rotateY(-120deg) translate3d(0, 0, var(--translationDistance));
        }
        
        .triangle-face-right {
            background: url('https://www.reuters.com/resizer/XA4fTG25QPltABHN7uB9J4hbIo8=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/MCVNTBOJANDCHEC4PS7AAWAD54.JPG');
            -webkit-transform: rotateY(120deg) translate3d(0, 0, var(--translationDistance));
                    transform: rotateY(120deg) translate3d(0, 0, var(--translationDistance));
            background-size: cover;
            background-position: center;
        }
        
        
        @-webkit-keyframes rotateTriangle {
            0% {
                -webkit-transform: rotateY(0deg);
                        transform: rotateY(0deg);
            }
            24%,34%{
                -webkit-transform: rotateY(120deg);
                        transform: rotateY(120deg);
            }
            58%,67%{
                -webkit-transform: rotateY(240deg);
                        transform: rotateY(240deg);
            }
            91%, 100% {
                -webkit-transform: rotateY(360deg);
                        transform: rotateY(360deg);
            }
        }
        
        
        @keyframes rotateTriangle {
            0% {
                -webkit-transform: rotateY(0deg);
                        transform: rotateY(0deg);
            }
            24%,34%{
                -webkit-transform: rotateY(120deg);
                        transform: rotateY(120deg);
            }
            58%,67%{
                -webkit-transform: rotateY(240deg);
                        transform: rotateY(240deg);
            }
            91%, 100% {
                -webkit-transform: rotateY(360deg);
                        transform: rotateY(360deg);
            }
        }          
    </style>
    
    <section class="triangleGrid" id="triangleGrid">
        <div class="scene">
            <div class="triangle">
                <div class="triangle-face  triangle-face-front">
                    <slot name="match-data"/>
                </div>
                <div class="triangle-face  triangle-face-left">
                    <slot name="match-score"/>
                </div>
                <div class="triangle-face  triangle-face-right">
                </div>
            </div>
        </div>
    </section>
`

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
class ScoreCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode : 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.elmnt = this.shadowRoot.getElementById("triangleGrid");
        this.dragElement(this.shadowRoot);
    }

    dragElement = (document) => {
        try {
            if (document.getElementById(this.elmnt.id + "header")) {

                document.getElementById(this.elmnt.id + "header").onmousedown = this.dragMouseDown;
            } else {

                this.elmnt.onmousedown = this.dragMouseDown;
            }
        }
        catch (err) {
            console.log(err, "errrrr")
        }
    }

    dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        document.onmousemove = this.elementDrag;
    }

    elementDrag = (e) => {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        this.elmnt.style.top = (this.elmnt.offsetTop - pos2) + "px";
        this.elmnt.style.left = (this.elmnt.offsetLeft - pos1) + "px";
    }

    closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
window.customElements.define('score-card',ScoreCard);
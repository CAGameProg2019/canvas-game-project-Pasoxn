addEventListener("keyup", ev => {
  if (ev.keyCode === 38) {

    let canvas = document.getElementById('main');
    let c = canvas.getContext('2d');
    //initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function timedText() {
      setTimeout(myTimeout1, 60000) 
      setTimeout(myTimeout2, 20000) 
      setTimeout(myTimeout3, 40000) 
    }
    function myTimeout1() {
      alert("you won.")
    }
  
    function myTimeout2() {
        core.radius = 5;
    }
    
  
    function myTimeout3() {
      core.radius = 7;
  }
  

 

    //variables
    let mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    //event listeners
    addEventListener('mousemove', function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });


    function getDistance(x1, y1, x2, y2) {
      let xDistance = x2 - x1;
      let yDistance = y2 - y1;

      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    let time = new Date();

    function Circle(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;

      this.update = function () {
        let times = time.getSeconds();
        console.log(times);
        this.draw();
      };

      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
      };
    }



    function Circles(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;


      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.stroke();
        c.fill();
        c.fillStyle = 'black';
      }
      this.update = function () {
        for (let i = 0; i < 50; i++) {
          if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
          }

          if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
          }

          this.x += this.dx;
          this.y += this.dy;

        }
        this.draw();
      }
    }

    var circleArray = [];
    for (var i = 0; i < 15; i++) {
      var radius = 7;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (.3);
      var dy = (.3);
      circleArray.push(new Circles(x, y, dx, dy, radius));
    }


    //implementation 
    let core;
    function init() {
      circle2 = new Circle(canvas.width / 2, canvas.height / 2, 20, 'black');
      core = new Circle(canvas.width / 2, canvas.height / 2, 4, 'red')
    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, innerWidth, innerHeight);

      circle2.x = mouse.x;
      circle2.y = mouse.y;
      circle2.update();

      core.x = mouse.x;
      core.y = mouse.y;
      core.update();

      for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        if (getDistance(core.x, core.y, circleArray[i].x, circleArray[i].y) < core.radius + 7) {
          c.clearRect(0, 0, innerWidth, innerHeight);
          alert('game over. you got hit. click ok to play again.');
        }
      }
    }
    init();
    animate();
  }
});



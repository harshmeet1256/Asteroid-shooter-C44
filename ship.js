function ship(){
    this.pos=createVector(width/2,height/2);
    this.r=20;
    this.heading=0;
    this.rotation=0;
    this.vel=createVector(1,0);
    this.isBoosting=false;
  
    this.boosting=function(b){
      this.isBoosting=b;
    }
  
    this.update=function(){
      this.pos.add(this.vel);
      this.vel.mult(0.99);
      if(this.isBoosting){
      this.boost();
      }
    }
  
    this.boost=function(){
      var force=p5.Vector.fromAngle(this.heading);
      force.mult(0.1);
      this.vel.add(force);
    }

    this.hits=function(asteroid){
      var d=dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y);
      if(d<this.r+asteroid.r){
        return true;
      }else{
        return false;
      }
    }
  
   this.render=function(){
     push();
     translate(this.pos.x,this.pos.y);
     rotate(this.heading+PI/2);
     fill(0);
     stroke(255) ; 
     triangle(-this.r,this.r,this.r,this.r,0,-this.r);
     pop();
    }
  
    this.edges=function(){
      if(this.pos.x>width+this.r){
        this.pos.x=-this.r;
      }else if(this.pos.x<-this.r){
        this.pos.x=width+this.r;
      }
      if(this.pos.y>height+this.r){
        this.pos.y=-this.r;
      }else if(this.pos.y<-this.r){
        this.pos.y=height+this.r;
      }
    }
  
   this.setRotation=function(a){
      this.rotation=a;
    }
  
   this.turn=function(){
      this.heading+=this.rotation; 
    }
  }
  
  function keyPressed(){
    if(keyCode==RIGHT_ARROW){
      ship.setRotation(6);
    }else if(keyCode==LEFT_ARROW){
      ship.setRotation(-6);
    }else if(keyCode==UP_ARROW){
      ship.boosting(true);
    }
  }
  
  function keyReleased(){
    ship.setRotation(0);
    ship.boosting(false);
  }
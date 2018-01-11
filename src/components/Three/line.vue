<template>

</template>
<style rel="stylesheet/scss" lang="scss">

</style>
<script>
    var mouseX = 0, mouseY = 0,
            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2,
            SEPARATION = 200,
            AMOUNTX = 10,
            AMOUNTY = 10,camera, scene, renderer;
    export default{
        data(){
            return{
            }
        },created(){
            this.init();
            this.animate();
        },methods:{
            init:function(){
                var container, separation = 100, amountX = 50, amountY = 50,
                        particles, particle;
                container = document.createElement('div');
                document.body.appendChild(container);
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 100;
                scene = new THREE.Scene();
                renderer = new THREE.CanvasRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor(0xFFFFFF);
                container.appendChild( renderer.domElement );
                // particles
                var PI2 = Math.PI * 2;
                var material = new THREE.SpriteCanvasMaterial( {
                    color: 0x3BB478,
                    opacity: 0.5,
                    program: function ( context ) {
                        context.beginPath();
                        context.arc( 0, 0, 0.5, 0, PI2, true );
                        context.fill();
                    }
                } );
                var geometry = new THREE.Geometry();
                for ( var i = 0; i < 100; i ++ ) {
                    particle = new THREE.Sprite( material );
                    particle.position.x = Math.random() * 2 - 1;
                    particle.position.y = Math.random() * 2 - 1;
                    particle.position.z = Math.random() * 2 - 1;
                    particle.position.normalize();
                    particle.position.multiplyScalar( Math.random() * 10 + 450 );
                    particle.scale.x = particle.scale.y = 10;
                    scene.add( particle );
                    geometry.vertices.push( particle.position );
                }
                // lines
                var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x3BB478, opacity: 0.5 } ) );
                scene.add( line );
                document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
                //
                window.addEventListener( 'resize', this.onWindowResize, false );
            },
            onWindowResize:function(){
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            },
            onDocumentMouseMove:function(event){
                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
            },
            onDocumentTouchStart:function(event){
                if ( event.touches.length > 1 ) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            },
            onDocumentTouchMove:function(event){
                if ( event.touches.length === 1 ) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            },
            animate:function(){
                requestAnimationFrame( this.animate );
                this.render();
            },
            render:function(){
                camera.position.x += ( mouseX - camera.position.x ) * .05;
                camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
                camera.lookAt( scene.position );
                renderer.render( scene, camera );
            }
        }
    }
</script>

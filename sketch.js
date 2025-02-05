
        let faceMesh;
        let mCamera;
        let faces = [];
        let ladybug;
        let ladybugIndex = 0;

        function preload() {
            faceMesh = ml5.faceMesh(gotFaces);
            ladybug = loadImage('https://upload.wikimedia.org/wikipedia/commons/6/6e/Ladybird_%28Coccinellidae%29.jpg'); // Placeholder image
        }

        function setup() {
            let canvas = createCanvas(windowWidth, windowHeight);
            canvas.parent(document.body);
            mCamera = createCapture(VIDEO, { flipped: true });
            mCamera.size(windowWidth, windowHeight);
            mCamera.hide();
            faceMesh.detect(mCamera);
        }

        function draw() {
            background(180, 200, 255);
            image(mCamera, 0, 0, width, height);
            
            if (faces.length > 0) {
                let face = faces[0];
                if (face.keypoints.length > 0) {
                    let keypoint = face.keypoints[ladybugIndex % face.keypoints.length];
                    image(ladybug, keypoint.x - 10, keypoint.y - 10, 20, 20);
                    ladybugIndex++;
                }
            }
        }

        function gotFaces(results) {
            faces = results;
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
            mCamera.size(windowWidth, windowHeight);
        }


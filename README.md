[![Build Status](https://travis-ci.org/albinotonnina/everkinetic-parser.svg?branch=master)](https://travis-ci.org/albinotonnina/everkinetic-parser)

# Parser for db.everkinetic.com

Parses data from [http://db.everkinetic.com](http://db.everkinetic.com)

## How to install

    npm install

## How to use
    npm start

## JSON Output

	[
    {
        "title": "Bench Press",
        "slug": "bench-press",
        "description": "This is an exercise for the chest.",
        "taxonomies": {
            "http:": ""
        },
        "steps": [
            "Lie on a flat bench with your feet flat on the floor, keep your back flat on the bench.",
            "Grasp the bar a little wider than shoulder width apart.",
            "Raise the barbell above your body and move it over the middle of your chest, this is your starting position.",
            "Lower the bar down so it just touches your chest.",
            "Raise the bar till your arms are fully extended and your elbows are locked.",
            "Return to starting position."
        ],
        "images": [
            {
                "url": "http://img.everkinetic.com/?action=image&id=19&number=0&key=69cadbdd2&version=cf619212&size=480,480&download=medium",
                "filename": "bench-press-0.png"
            },
            {
                "url": "http://img.everkinetic.com/?action=image&id=19&number=1&key=69cadbdd2&version=5c40b61d&size=480,480&download=medium",
                "filename": "bench-press-1.png"
            }
        ]
    },
    {
        "title": "Supermans",
        "slug": "supermans",
        "description": "This is an excellent exercise and a stretch for the lower back and core muscles.",
        "taxonomies": {
            "http:": ""
        },
        "steps": [
            "Lie flat on your stomach with your arms stretched out in front of you.",
            "Raise your arms and legs off the floor and hold this position for 2 seconds.",
            "Return to the starting position on the floor.",
            "Repeat."
        ],
        "images": [
            {
                "url": "http://img.everkinetic.com/?action=image&id=436&number=0&key=69cadbdd2&version=5b45371b&size=480,480&download=medium",
                "filename": "supermans-0.png"
            },
            {
                "url": "http://img.everkinetic.com/?action=image&id=436&number=1&key=69cadbdd2&version=7a1d6486&size=480,480&download=medium",
                "filename": "supermans-1.png"
            }
        ]
    },
    {...}]

## Images
	./assets/ecercises/images/[exerciseimage].png

![Exercise image](http://img.everkinetic.com/?action=image&id=19&number=0&key=69cadbdd2&version=cf619212&size=280,420)


![Exercise image](http://img.everkinetic.com/?action=image&id=19&number=1&key=69cadbdd2&version=5c40b61d&size=280,420)

![Exercise image](http://img.everkinetic.com/?action=image&id=436&number=0&key=69cadbdd2&version=5b45371b&size=280,420)


![Exercise image](http://img.everkinetic.com/?action=image&id=436&number=1&key=69cadbdd2&version=7a1d6486&size=280,420)


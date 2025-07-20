#!/usr/bin/env bash
set -e

# Create folder structure
mkdir -p assets/{icons,photos,avatars,logo}

# Icons (Flaticon – CC‑BY)
curl -L -o assets/icons/transport.png "https://cdn-icons-png.flaticon.com/512/161/161192.png"
curl -L -o assets/icons/biking.png "https://cdn-icons-png.flaticon.com/512/3050/3050897.png"
curl -L -o assets/icons/electric-car.png "https://cdn-icons-png.flaticon.com/512/743/743131.png"
curl -L -o assets/icons/carpool.png "https://cdn-icons-png.flaticon.com/512/681/681494.png"
curl -L -o assets/icons/solar-panels.png "https://cdn-icons-png.flaticon.com/512/3105/3105765.png"
curl -L -o assets/icons/led-bulbs.png "https://cdn-icons-png.flaticon.com/512/2913/2913461.png"
curl -L -o assets/icons/thermostat.png "https://cdn-icons-png.flaticon.com/512/8614/8614502.png"
curl -L -o assets/icons/insulation.png "https://cdn-icons-png.flaticon.com/512/809/809180.png"
curl -L -o assets/icons/diet.png "https://cdn-icons-png.flaticon.com/512/136/136525.png"
curl -L -o assets/icons/shopping.png "https://cdn-icons-png.flaticon.com/512/833/833314.png"
curl -L -o assets/icons/food-waste.png "https://cdn-icons-png.flaticon.com/512/5261/5261379.png"

# Photos (Unsplash & Pexels – CC0)
curl -L -o assets/photos/earth-hero.jpg "https://images.pexels.com/photos/72492/pexels-photo.jpg"
curl -L -o assets/photos/public-transport.jpg "https://images.pexels.com/photos/379526/pexels-photo-379526.jpeg"
curl -L -o assets/photos/biking.jpg "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg"
curl -L -o assets/photos/carpool.jpg "https://images.pexels.com/photos/130574/pexels-photo-130574.jpeg"
curl -L -o assets/photos/solar-panels.jpg "https://images.pexels.com/photos/356036/solar-panels-portugal-industry-356036.jpeg"
curl -L -o assets/photos/led-bulbs.jpg "https://images.pexels.com/photos/110954/pexels-photo-110954.jpeg"
curl -L -o assets/photos/thermostat.jpg "https://images.pexels.com/photos/112867/pexels-photo-112867.jpeg"
curl -L -o assets/photos/insulation.jpg "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
curl -L -o assets/photos/cleanup-event.jpg "https://images.pexels.com/photos/159539/pexels-photo-159539.jpeg"
curl -L -o assets/photos/workshop-event.jpg "https://images.pexels.com/photos/318443/pexels-photo-318443.jpeg"
curl -L -o assets/photos/march-event.jpg "https://images.pexels.com/photos/357338/pexels-photo-357338.jpeg"
curl -L -o assets/photos/tree-event.jpg "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg"
curl -L -o assets/photos/fundraiser-event.jpg "https://images.pexels.com/photos/925747/pexels-photo-925747.jpeg"
curl -L -o assets/photos/group-meeting.jpg "https://images.pexels.com/photos/318276/pexels-photo-318276.jpeg"

# Avatars (Unsplash – CC0)
curl -L -o assets/avatars/user1.jpg "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
curl -L -o assets/avatars/user2.jpg "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
curl -L -o assets/avatars/user3.jpg "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"

# Logo & favicon
curl -L -o assets/logo/logo.png "https://cdn-icons-png.flaticon.com/512/252/252035.png"
curl -L -o assets/logo/favicon.ico "https://favicon.io/favicon-generator/?t=eco"

# Zip it
zip -r assets.zip assets

echo "✅ assets.zip created successfully."

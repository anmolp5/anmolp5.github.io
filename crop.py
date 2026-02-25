from PIL import Image

img = Image.open('public/images/projects/ftc-robotics/2.jpg')
w, h = img.size

# The user wants to zoom in on the robot. The image is 768x1024.
# Let's crop out 20% from left and right, and maintain the original 3:4 aspect ratio.
# If we crop 20% from left (153px) and 20% from right (153px), new width is 462px.
# To keep 3:4 aspect ratio, new height should be 462 * 4/3 = 616px.
# Original height is 1024. So we need to crop 1024 - 616 = 408px vertically.
# Let's crop 15% from top (153px) and the rest from bottom (255px).

new_w = int(w * 0.6)
new_h = int(new_w * (1024/768))

left = int(w * 0.2)
top = int(h * 0.15)
right = left + new_w
bottom = top + new_h

cropped = img.crop((left, top, right, bottom))
cropped.save('public/images/projects/ftc-robotics/cropped_2_zoomed.jpg')

# A slightly less aggressive zoom:
new_w2 = int(w * 0.7)
new_h2 = int(new_w2 * (1024/768))
left2 = int(w * 0.15)
top2 = int(h * 0.1)
right2 = left2 + new_w2
bottom2 = top2 + new_h2
cropped2 = img.crop((left2, top2, right2, bottom2))
cropped2.save('public/images/projects/ftc-robotics/cropped_2_zoomed_less.jpg')

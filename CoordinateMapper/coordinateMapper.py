# This is a python3 script that will take an image as an input 
# and allow you to click on areas of the image to recieve (x,y) coordinates of that location on the image.
# This script uses the OpenCV library for python. 
# The image will need to be in the same folder as this script. 
# Coordinates will print to shell.
# 
# The purpose of this script for this application, is so that a developer can take a 2D image/floor plan
# with nodes marked on it for each location where a photosphere was captured, and use this script to 
# calculate (x,y) coordinates for each node. 
#
# Origin(x = 0, y = 0) will be top left corner.

import cv2
  
# Capture coordinates upon each mouse click
# Left or right mouse click is supported
def clickEvent(event, x, y, flags, params):
 
    # Left mouse click capture
    if event == cv2.EVENT_LBUTTONDOWN:
 
        # Print coordinates to shell
        print(x, ' ', y)
 
    # Right mouse click capture
    if event==cv2.EVENT_RBUTTONDOWN:
 
        # Print coordinates to shell
        print(x, ' ', y)
 
# Driver
if __name__=="__main__":
 
    # Read source image
    img = cv2.imread('map1.jpg', 1)
 
    # Display image
    cv2.imshow('image', img)
 
    # GUI function to track mouse and call function when mouse action occurs
    cv2.setMouseCallback('image', click_event)
 
    # Close window when 0 key is selected
    cv2.waitKey(0)
    cv2.destroyAllWindows()

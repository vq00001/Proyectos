## check for ALL image format
## upgrade screen display, hard to see

import os, shutil
import re



#setup

print( "_______________________________________________________________________")
print("|                                                                       |")
print("|                                  SETUP                                |")
print("|_______________________________________________________________________|\n")


#ask if is one folder or a folder containing various others
mode = int(input("1 - One folder\n2 - Folder containing various other folders \n> "))
if mode == 1:
    pdfname = input("Name of the volume> ")
elif mode == 2:
    pdfname = input("Series Name> ")



main_path = input("Path> ")
while not os.path.isdir(main_path):
    print("This path is not valid, please try again.")
    main_path = input("Path> ")

print("------------------------------------------------------------------------")


match_regex = "[^a-zA-Z 0-9_-]"

while bool(re.findall(match_regex, pdfname)):
    print("This characters are not allowed in the name of the file: ", bool(re.findall(match_regex, pdfname)))
    print("This name is not valid, please choose a name without special characters.")
    pdfname = input("Series Name> ")

print("------------------------------------------------------------------------")

if mode == 1:
    start_volume = input("Insert the number of the volume: ")
elif mode == 2:
    start_volume = input("Insert the number of the first volume: ")


while not start_volume.isdigit():
    print("This value is not a number, please try again: ")
    start_volume = input("Insert the number of the first volume: ")

start_volume = int(start_volume)
    
print(" _______________________________________________________________________ ")
print("|                                                                       |")    
print("|                                  STARTING                             |")
print("|_______________________________________________________________________|\n")

print("MAIN FOLDER: " + main_path)
print("\nSERIES NAME: " + pdfname)
print("STARTING FROM VOLUME: " + format(start_volume))
print("------------------------------------------------------------------------")

## go to main path
os.chdir(main_path)


if mode == 1:
    
    # format photos inside folders
   
    src = f"{main_path}"    

    photo_list = os.listdir(src) # list of files inside folder

    # check for image format
    extension = os.path.splitext(photo_list[0])[1]

    j = 1
    while extension == "url":
        extension = os.path.splitext(photo_list[0 + j])[1]
        j += 1

    print("------------------------------------------------------------------------\n")
    print(f"FORMATING FOLDER {src}")
    print(f"IMAGE FORMAT: {extension}")

    cover = False
    image = 0
    for image in os.walk(f"{src}/{photo_list[j]}"):
        if os.path.splitext(image)[0].lower() == "cover": 
            cover = True
            break
        
        image += 1                
            
    if cover:
        shutil.copy(f"{src}/{photo_list[image]}", f"{src}/ZZZ{extension}")
    else:
        shutil.copy(f"{src}/{photo_list[0]}", f"{src}/ZZZ{extension}") # copy cover and rename it to zzz so it will show up at the end. 

    #add o if i<10  
    if start_volume< 10 :
        file_name = f"{pdfname}_V0{start_volume}.pdf"
    else:
        file_name = f"{pdfname}_V{start_volume}.pdf"
    
    os.chdir(src)
    os.system(f"magick *{extension} -reverse {file_name}")



elif mode == 2:
    file_list = os.listdir(main_path)
    folder_list = []

    # search for folders through the directory
    for file in file_list:
        if not os.path.isfile(file):
            folder_list.append(file)

  
    # format photos inside folders
    i = start_volume # vol. counter
    z = 1 # loop counter
    for folder in folder_list:

        src = f"{main_path}/{folder}"    

        photo_list = os.listdir(src) # list of files inside folder

        # check for image format
        extension = os.path.splitext(photo_list[0])[1]

        j = 1
        while extension == "url":
            extension = os.path.splitext(photo_list[0 + j])[1]
            j += 1

        print("------------------------------------------------------------------------\n")
        print(f"FORMATING FOLDER <{z}> OF {len(folder_list)}")
        print(f"SOURCE: {src}")
        print(f"IMAGE FORMAT: {extension}")

        cover = False
        image = 0
        for image in os.walk(f"{src}/{photo_list[j]}"):
            if os.path.splitext(image)[0].lower() == "cover": 
                cover = True
                break
            
            image += 1                
                
        if cover:
            shutil.copy(f"{src}/{photo_list[image]}", f"{src}/ZZZ{extension}")
        else:
            shutil.copy(f"{src}/{photo_list[0]}", f"{src}/ZZZ{extension}") # copy cover and rename it to zzz so it will show up at the end. 

        #add o if i<10  
        if i < 10 :
            file_name = f"{pdfname}_V0{i}.pdf"
        else:
            file_name = f"{pdfname}_V{i}.pdf"
        
        os.chdir(src)
        os.system(f"magick *{extension} -reverse {file_name}")

        # move pdfs to main folder if source exists

        if os.path.exists(f"{src}/{file_name}"):
            shutil.move(f"{src}/{file_name}", f"{main_path}/{file_name}")

        i += 1
        z += 1


    

print(" _______________________________________________________________________" )
print("|                                                                       |")    
print("|                                 FINISHED                              |")
print("|_______________________________________________________________________|")

os.system("pause")



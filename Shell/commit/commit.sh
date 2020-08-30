echo "Hello, this is the first version of the script to achieve historical submission \n"
read -p "The first version of the script to achieve historical submission: " date
echo "Time is $date \n"
read -p "Please confirm [y/n]" confirm
case $confirm in
    [yY][eE][sS]|[yY])
		echo "Yes"
        node commit\ .js
        git pull
        git add .
        git commit -m 'shell commit'
        git push
		;;

    [nN][oO]|[nN])
		echo "No"
       	;;

    *)
		echo "Invalid input..."
		exit 1
		;;
esac
exit 0
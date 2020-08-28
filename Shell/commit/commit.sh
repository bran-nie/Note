echo "Hello, this is the first version of the script to achieve historical submission \n"
read -p "Please enter a number to indicate that you want to submit history a few days ago: " ago
echo "ago $ago \n"
commit_date=`date -v-${ago}d -R`
echo "commit date: $commit_date"
read -p "Please confirm [y/n]" confirm
case $confirm in
    [yY][eE][sS]|[yY])
		echo "Yes"
        node commit\ .js
        git pull
        git add .
        git commit -m 'shell commit' --date="$commit_date"
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
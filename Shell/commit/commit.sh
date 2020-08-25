echo "Hello, this is the first version of the script to achieve historical submission"
read -p "Please enter a number to indicate that you want to submit history a few days ago: " ago
echo "ago $ago \n"
commit_date=`date -v-${ago}d -R`
echo "commit date: $commit_date"
echo "current date: `date -R`\n"
read -p "Please confirm [y/n]" confirm
case $confirm in
    [yY][eE][sS]|[yY])
		echo "Yes, will commit \n"
        node commit\ .js
        git pull
        echo "\n"
        git add .
        echo "\n"
        git commit -m 'shell commit' --date="$commit_date"
        echo "\n"
        git push
		;;

    [nN][oO]|[nN])
		echo "No, will cancel commit"
       	;;

    *)
		echo "Invalid input..."
		exit 1
		;;
esac
exit 0
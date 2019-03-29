#!/bin/bash

# We pass the directory where to find the files as argument to the script
echo "Replacing in directory $1";

# Loop through all the env vars and replace in the files
for var in $(bash -c "compgen -e"); do 
  if [[ $var == MSA_* ]] ;
  then
    if [[ ${!var} == true || ${!var} == false ]]; then
      find $1 -type f -name '*.js' -exec sed -i "s~\"{{$var}}\"~${!var}~g" {} \;
    else
      find $1 -type f -name '*.js' -exec sed -i "s~{{$var}}~${!var}~g" {} \;
    fi
    echo "Replace $var with ${!var}";

    # make all env variables available
    eval $var=${!var};
  fi
done

echo "Finished replacing";

# delete source maps
rm $1/*.map
echo "Deleted sourcemaps"

# delete other obsolete files
rm $1/gulpfile.js
rm $1/Dockerfile

# Run nginx
echo "Starting nginx"
nginx -g 'daemon off;'
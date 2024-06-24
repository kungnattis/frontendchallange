# How to set up

Clone the project
Run npm install


# Url to working Web page

https://helpful-brioche-9db620.netlify.app/


# Link to repository

https://github.com/kungnattis/frontendchallange


# Things a would have done if I had more time

Now the text only changes after the user leaves the textfield, I would either put a button or make it change as the user writes, if that's what's intended, I'm not quite sure on when the resizing should be done.

I would put som auto detection for the phones orientation so the text would resize when the phone is flipped

But first I would figure out exactly when the resizing should occur. If it's only on page load I would use a different way of doing it that if it is on text changed.

I would probably make a component out of the resizing-div that accepted the text to display and managed it's own resizing. Maybe add a color-attribute too, then the code would be much easier to manage.


# Side note
I came across som errors when I first tried to run the project, I don't know if it is by design or if I was just unlucky. Here are the solution that worked for me if it happens to more people:
"npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828)"
So you have to remove package.lock and try "npm install" again to resolve the issue.
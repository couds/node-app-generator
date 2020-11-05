# Node App Generator

Currently this package only have one type of template (API), this template have what I think is the bare minimum you should have on your api.

## How to use

- Install the package with `npm i -g @couds/node-app-generator`
- Run the generator `node-app-generator`. This will ask you a series of questions, which template you want to use and name of your project.
- Now you can open the project in your favorite code editor.
- Read the readme inside your project for specific instructions of the template.


Code fun =)

## Add your own template

New templates are more than welcome, to add it just create a PR adding your project template in `src/templates/[your-template-name]`

### To take into account

There are some placeholders that will be string replaced when a user create a template, for example `project__name__` will be replaced for the actual project name.

Probably there will be more placeholders in the future, but should probably follow the same convention

- All lowercase
- Snake_case with double underscore
- Ends with double underscore

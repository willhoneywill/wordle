# sass-starter
Boilerplate for Sass project using 7-1 architecture pattern.
Each folder contains its own README.md file to explain purpose.  


## File Directory
```
sass-starter/
- base/
      _reset.scss           # Reset/normalize
      _fonts.scss           # Font face declarations
      _typography.scss      # Typography rules
      _helpers.scss         # Class & placeholders helpers

- components/
      _buttons.scss         # Buttons
      _cards.scss           # Cards
      _forms.scss           # Forms

- layout/
      _navigation.scss      # Navigation
      _header.scss          # Header
      _footer.scss          # Footer

- pages/
      _template.scss        # Default template
      _home.scss            # Home specific styles
      _contact.scss         # Contact specifict styles
      
- themes/
      _default.scss         # Contains all related files to default theme
      admin                 # Admin theme folder
      vanilla               # Default theme folder

- abstracts /
      _variables.scss       # Sass variables
      _functions.scss       # Sass functions
      _mixins.scss          # Sass mixins

- vendors/
      _bootstrap.scss       # Bootstrap

jro-starter.scss            # Main Sass file
```
export interface RegistryEntry {
  name: string;
  type: "registry:ui" | "registry:lib" | "registry:hook" | "registry:block";
  title: string;
  description: string;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: {
    path: string;
    target: string;
    type: "registry:ui" | "registry:lib" | "registry:hook";
  }[];
}

export const registry: RegistryEntry[] = [
  // ─── LIB ──────────────────────────────────
  {
    name: "utils",
    type: "registry:lib",
    title: "Utilities",
    description: "cn helper and utility functions",
    dependencies: [
      "react-aria-components",
      "tailwind-merge",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        target: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },

  // ─── UI COMPONENTS ────────────────────────
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "A button component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Button.tsx",
        target: "components/ui/Button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description: "A dialog component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-merge"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/Dialog.tsx",
        target: "components/ui/Dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "alertDialog",
    type: "registry:ui",
    title: "Alert Dialog",
    description: "An alert dialog component built on React Aria",
    dependencies: [
      "react-aria-components",
      "react-aria",
      "react",
      "lucide-react",
    ],
    devDependencies: [],
    registryDependencies: ["utils", "button", "dialog"],
    files: [
      {
        path: "components/ui/AlertDialog.tsx",
        target: "components/ui/AlertDialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "field",
    type: "registry:ui",
    title: "Field",
    description: "A field component built on React Aria",
    dependencies: [
      "react-aria-components",
      "tailwind-merge",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Field.tsx",
        target: "components/ui/Field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "fieldButton",
    type: "registry:ui",
    title: "Field Button",
    description: "A field button component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/FieldButton.tsx",
        target: "components/ui/FieldButton.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "link",
    type: "registry:ui",
    title: "Link",
    description: "A link component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Link.tsx",
        target: "components/ui/Link.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorThumb",
    type: "registry:ui",
    title: "Color Thumb",
    description: "A color thumb component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/ColorThumb.tsx",
        target: "components/ui/ColorThumb.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorArea",
    type: "registry:ui",
    title: "Color Area",
    description: "A color area component built on React Aria",
    dependencies: ["react-aria-components"],
    devDependencies: [],
    registryDependencies: ["utils", "colorThumb"],
    files: [
      {
        path: "components/ui/ColorArea.tsx",
        target: "components/ui/ColorArea.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorField",
    type: "registry:ui",
    title: "Color Field",
    description: "A color field component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/ColorField.tsx",
        target: "components/ui/ColorField.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorSlider",
    type: "registry:ui",
    title: "Color Slider",
    description: "A color slider component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["field", "utils", "colorThumb"],
    files: [
      {
        path: "components/ui/ColorSlider.tsx",
        target: "components/ui/ColorSlider.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorSwatch",
    type: "registry:ui",
    title: "Color Swatch",
    description: "A color swatch component built on React Aria",
    dependencies: ["react-aria-components"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/ColorSwatch.tsx",
        target: "components/ui/ColorSwatch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorSwatchPicker",
    type: "registry:ui",
    title: "Color Swatch Picker",
    description: "A color swatch picker component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["colorSwatch", "utils"],
    files: [
      {
        path: "components/ui/ColorSwatchPicker.tsx",
        target: "components/ui/ColorSwatchPicker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorWheel",
    type: "registry:ui",
    title: "Color Wheel",
    description: "A color wheel component built on React Aria",
    dependencies: ["react-aria-components"],
    devDependencies: [],
    registryDependencies: ["colorThumb"],
    files: [
      {
        path: "components/ui/ColorWheel.tsx",
        target: "components/ui/ColorWheel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colorPicker",
    type: "registry:ui",
    title: "Color Picker",
    description: "A color picker component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: [
      "colorSwatch",
      "colorArea",
      "colorSlider",
      "colorField",
      "dialog",
      "popover",
      "utils",
    ],
    files: [
      {
        path: "components/ui/ColorPicker.tsx",
        target: "components/ui/ColorPicker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    title: "Popover",
    description: "A popover component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/Popover.tsx",
        target: "components/ui/Popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "modal",
    type: "registry:ui",
    title: "Modal",
    description: "A modal component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/Modal.tsx",
        target: "components/ui/Modal.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "listBox",
    type: "registry:ui",
    title: "List Box",
    description: "A list box component built on React Aria",
    dependencies: [
      "lucide-react",
      "react-aria-components",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/ListBox.tsx",
        target: "components/ui/ListBox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menu",
    type: "registry:ui",
    title: "Menu",
    description: "A menu component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components", "react"],
    devDependencies: [],
    registryDependencies: ["listBox", "popover"],
    files: [
      {
        path: "components/ui/Menu.tsx",
        target: "components/ui/Menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "searchField",
    type: "registry:ui",
    title: "Search Field",
    description: "A search field component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: ["field", "utils", "fieldButton"],
    files: [
      {
        path: "components/ui/SearchField.tsx",
        target: "components/ui/SearchField.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "commandPalette",
    type: "registry:ui",
    title: "Command Palette",
    description: "A command palette component built on React Aria",
    dependencies: ["react-aria-components", "react"],
    devDependencies: [],
    registryDependencies: ["menu", "searchField", "modal"],
    files: [
      {
        path: "components/ui/CommandPalette.tsx",
        target: "components/ui/CommandPalette.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "comboBox",
    type: "registry:ui",
    title: "Combo Box",
    description: "A combo box component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: ["field", "popover", "utils", "fieldButton"],
    files: [
      {
        path: "components/ui/ComboBox.tsx",
        target: "components/ui/ComboBox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dateField",
    type: "registry:ui",
    title: "Date Field",
    description: "A date field component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/DateField.tsx",
        target: "components/ui/DateField.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "rangeCalendar",
    type: "registry:ui",
    title: "Range Calendar",
    description: "A range calendar component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["calendar", "utils"],
    files: [
      {
        path: "components/ui/RangeCalendar.tsx",
        target: "components/ui/RangeCalendar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "datePicker",
    type: "registry:ui",
    title: "Date Picker",
    description: "A date picker component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: [
      "calendar",
      "dateField",
      "field",
      "popover",
      "utils",
      "fieldButton",
    ],
    files: [
      {
        path: "components/ui/DatePicker.tsx",
        target: "components/ui/DatePicker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dateRangePicker",
    type: "registry:ui",
    title: "Date Range Picker",
    description: "A date range picker component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: [
      "dateField",
      "field",
      "popover",
      "rangeCalendar",
      "utils",
      "fieldButton",
    ],
    files: [
      {
        path: "components/ui/DateRangePicker.tsx",
        target: "components/ui/DateRangePicker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "disclosure",
    type: "registry:ui",
    title: "Disclosure",
    description: "A disclosure component built on React Aria",
    dependencies: [
      "react",
      "react-aria-components",
      "lucide-react",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "components/ui/Disclosure.tsx",
        target: "components/ui/Disclosure.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "disclosureGroup",
    type: "registry:ui",
    title: "Disclosure Group",
    description: "A disclosure group component built on React Aria",
    dependencies: ["react-aria-components"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/DisclosureGroup.tsx",
        target: "components/ui/DisclosureGroup.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropZone",
    type: "registry:ui",
    title: "Drop Zone",
    description: "A drop zone component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/DropZone.tsx",
        target: "components/ui/DropZone.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "form",
    type: "registry:ui",
    title: "Form",
    description: "A form component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-merge"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/Form.tsx",
        target: "components/ui/Form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "gridList",
    type: "registry:ui",
    title: "Grid List",
    description: "A grid list component built on React Aria",
    dependencies: [
      "react-aria-components",
      "tailwind-variants",
      "react",
      "tailwind-merge",
    ],
    devDependencies: [],
    registryDependencies: ["checkbox", "utils"],
    files: [
      {
        path: "components/ui/GridList.tsx",
        target: "components/ui/GridList.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "meter",
    type: "registry:ui",
    title: "Meter",
    description: "A meter component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/Meter.tsx",
        target: "components/ui/Meter.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "numberField",
    type: "registry:ui",
    title: "Number Field",
    description: "A number field component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/NumberField.tsx",
        target: "components/ui/NumberField.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "progressBar",
    type: "registry:ui",
    title: "Progress Bar",
    description: "A progress bar component built on React Aria",
    dependencies: ["react-aria-components"],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/ProgressBar.tsx",
        target: "components/ui/ProgressBar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "radioGroup",
    type: "registry:ui",
    title: "Radio Group",
    description: "A radio group component built on React Aria",
    dependencies: ["react", "react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/RadioGroup.tsx",
        target: "components/ui/RadioGroup.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "A select component built on React Aria",
    dependencies: [
      "lucide-react",
      "react-aria-components",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["field", "popover", "utils"],
    files: [
      {
        path: "components/ui/Select.tsx",
        target: "components/ui/Select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "separator",
    type: "registry:ui",
    title: "Separator",
    description: "A separator component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/Separator.tsx",
        target: "components/ui/Separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description: "A slider component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/Slider.tsx",
        target: "components/ui/Slider.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description: "A switch component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Switch.tsx",
        target: "components/ui/Switch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "table",
    type: "registry:ui",
    title: "Table",
    description: "A table component built on React Aria",
    dependencies: [
      "lucide-react",
      "react-aria-components",
      "tailwind-merge",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["checkbox", "utils"],
    files: [
      {
        path: "components/ui/Table.tsx",
        target: "components/ui/Table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description: "A tabs component built on React Aria",
    dependencies: [
      "react-aria-components",
      "tailwind-variants",
      "tailwind-merge",
    ],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Tabs.tsx",
        target: "components/ui/Tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tagGroup",
    type: "registry:ui",
    title: "Tag Group",
    description: "A tag group component built on React Aria",
    dependencies: [
      "lucide-react",
      "react",
      "react-aria-components",
      "tailwind-merge",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/TagGroup.tsx",
        target: "components/ui/TagGroup.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textField",
    type: "registry:ui",
    title: "Text Field",
    description: "A text field component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/TextField.tsx",
        target: "components/ui/TextField.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "timeField",
    type: "registry:ui",
    title: "Time Field",
    description: "A time field component built on React Aria",
    dependencies: ["react-aria-components"],
    devDependencies: [],
    registryDependencies: ["dateField", "field", "utils"],
    files: [
      {
        path: "components/ui/TimeField.tsx",
        target: "components/ui/TimeField.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toast",
    type: "registry:ui",
    title: "Toast",
    description: "A toast component built on React Aria",
    dependencies: ["react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/Toast.tsx",
        target: "components/ui/Toast.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggleButton",
    type: "registry:ui",
    title: "Toggle Button",
    description: "A toggle button component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/ToggleButton.tsx",
        target: "components/ui/ToggleButton.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggleButtonGroup",
    type: "registry:ui",
    title: "Toggle Button Group",
    description: "A toggle button group component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/ToggleButtonGroup.tsx",
        target: "components/ui/ToggleButtonGroup.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toolbar",
    type: "registry:ui",
    title: "Toolbar",
    description: "A toolbar component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Toolbar.tsx",
        target: "components/ui/Toolbar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description: "A tooltip component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Tooltip.tsx",
        target: "components/ui/Tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tree",
    type: "registry:ui",
    title: "Tree",
    description: "A tree component built on React Aria",
    dependencies: ["react-aria-components", "tailwind-variants"],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Tree.tsx",
        target: "components/ui/Tree.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "breadcrumbs",
    type: "registry:ui",
    title: "Breadcrumbs",
    description: "A breadcrumbs component built on React Aria",
    dependencies: ["lucide-react", "react-aria-components", "tailwind-merge"],
    devDependencies: [],
    registryDependencies: ["link", "utils"],
    files: [
      {
        path: "components/ui/Breadcrumbs.tsx",
        target: "components/ui/Breadcrumbs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description: "A calendar component built on React Aria",
    dependencies: [
      "lucide-react",
      "react-aria-components",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "components/ui/Calendar.tsx",
        target: "components/ui/Calendar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description: "A checkbox component built on React Aria",
    dependencies: [
      "lucide-react",
      "react-aria-components",
      "tailwind-variants",
    ],
    devDependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/Checkbox.tsx",
        target: "components/ui/Checkbox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkboxGroup",
    type: "registry:ui",
    title: "Checkbox Group",
    description: "A checkbox group component built on React Aria",
    dependencies: ["react", "react-aria-components"],
    devDependencies: [],
    registryDependencies: ["field", "utils"],
    files: [
      {
        path: "components/ui/CheckboxGroup.tsx",
        target: "components/ui/CheckboxGroup.tsx",
        type: "registry:ui",
      },
    ],
  },
];

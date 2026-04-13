import { useState } from "react";
import * as Components from "@repo/ui/components/ui/index.tsx";
import { Button } from "@repo/ui/components/ui/Button.tsx";
import { NavBar } from "./components/NavBar";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-12">
      <NavBar />
      <h1 className="text-3xl font-bold">UI Library Showcase</h1>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="space-y-4">
          <div>
            <h3>Button Variants</h3>
            <div className="flex gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="quiet">Quiet</Button>
            </div>
          </div>
          <div>
            <h3>Toggle Button</h3>
            <Components.ToggleButton>Toggle</Components.ToggleButton>
          </div>
        </div>
      </section>

      {/* Form Inputs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Form Inputs</h2>
        <div className="space-y-4">
          <Components.TextField label="Text Field" placeholder="Enter text" />
          <Components.NumberField label="Number Field" />
          <Components.SearchField label="Search Field" />
          <Components.DateField label="Date Field" />
          <Components.TimeField label="Time Field" />
          <Components.Checkbox>Checkbox</Components.Checkbox>
          <Components.Switch>Switch</Components.Switch>
          <Components.Slider label="Slider" />
        </div>
      </section>

      {/* Selection */}
      {/* Overlays */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Overlays</h2>
        <div className="space-y-4">
          <Components.Button onPress={() => setModalOpen(true)}>
            Open Modal
          </Components.Button>
          <Components.Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
            <Components.Dialog>
              <h3>Modal Dialog</h3>
              <p>This is a modal dialog.</p>
              <Components.Button onPress={() => setModalOpen(false)}>
                Close
              </Components.Button>
            </Components.Dialog>
          </Components.Modal>
        </div>
      </section>

      {/* Navigation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
        <div className="space-y-4">
          <Components.Tabs>
            <Components.TabList>
              <Components.Tab id="tab1">Tab 1</Components.Tab>
              <Components.Tab id="tab2">Tab 2</Components.Tab>
            </Components.TabList>
            <Components.TabPanel id="tab1">Content 1</Components.TabPanel>
            <Components.TabPanel id="tab2">Content 2</Components.TabPanel>
          </Components.Tabs>
          <Components.Link href="#">Link</Components.Link>
        </div>
      </section>

      {/* Toast Region */}
      <Components.MyToastRegion />

      <Components.Button
        onPress={() =>
          Components.toastQueue.add({
            title: "Toast",
            description: "This is a toast notification",
          })
        }
      >
        Show Toast
      </Components.Button>
    </div>
  );
}

export default App;

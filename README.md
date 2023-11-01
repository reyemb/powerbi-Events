# PowerBI Custom Visual: Events Visual for Machine Status Monitoring

## The Events Visual

Our Events Visual offers real-time monitoring of machine statuses over specified time intervals, such as a 24-hour day. This is achieved using vibrant color-coded events that can be customized via a JSON string. The visual also supports a wide range of formatting options for enhanced user experience.

## Features

- Crossfiltering
- Various formatting options to style the chart to your needs
- Multilanguage support (English, German, French, Spanish, Italian)

## Demo

To evaluate the capabilities of this custom visual, check out the video file at `/demo/demo.mp4`.

https://github.com/reyemb/powerbi-Events/assets/60140509/140fc3be-46c2-46b5-ac16-09790d068abf

## Changelog

 - Version 1.0 - Initial Commit
 - Version 1.1:
    Functionality to add events to Y-Axis
    Functionality that datetime can be start or end of events
 - Version 1.2:
    Moved from community version to https://github.com/microsoft/powerbi-visuals-utils-formattingmodel

## Changes Version 1.1 MP4

## Next Steps

Enable Drillthrough

## Installation

1. Download the `PowerBI_Events_{version}.pbiviz` file.
2. Open Power BI Desktop.
3. In the Home tab, look for the Visualizations pane. At the bottom, you will find an ellipsis (...) button.
4. Click the ellipsis (...) button to open the menu.
5. Select the Import from file option.
6. Browse to the location where your `.pbiviz` file is saved.
7. Click the `.pbiviz` file you want to import and select Open.
8. A prompt will appear asking to import the file. Click Import.
9. After the visualization is successfully imported, it will appear in the Visualizations pane and you can use it like any other visualization.


## Development

1. Install `pbiviz` by running `npm install -g powerbi-visuals-tools`.
2. Start a development server by running `npm run start`.
3. Go to Power BI service (app.powerbi.com).
4. Navigate to your report (you might need to create a new one or edit an existing one).
5. In the Visualizations pane, you will find an icon for the Developer visual. It's the icon with the "< >" symbol. If you don't see it, you might need to enable it in the settings. You can do this by going to File > Options and settings > Options > Preview features and then enable the Developer visual for testing option.
6. Add the Developer visual to your report.
7. If your visual project is running (you've started it with `pbiviz start`), your visual will render in the Developer visual placeholder.

## Dependencies

This project relies on a variety of libraries including `d3`, `powerbi-models`, `powerbi-visuals-api`, and `powerbi-visuals-utils-formattingutils`. All dependencies can be found in the `package.json` file. 

## Feedback and Improvements

Missed a formatting feature? Feel free to open an issue for improvement. Your input is invaluable in refining this visual tool.

We hope this custom Events Visual elevates your PowerBI experience. Thank you for your interest and contributions.

## Contributing

Contributions are welcomed in the form of pull requests or translations into different languages.

For more details about the implementation of this custom visual, refer to the `pbiviz.json` and `package.json` files.


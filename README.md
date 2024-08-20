# SMLLM

This project is a React-based web application that uses a small language model to generate content based on user prompts. It features a clean, Material-UI styled interface and communicates with an AI API to produce text content.

## Features

- User-friendly interface for entering prompts
- AI-powered content generation
- Real-time loading feedback
- Error handling with user notifications

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later recommended)
- Yarn package manager

## Installation

To install the Content Creator, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/labKnowledge/SMLLM.git
   ```
2. Navigate to the project directory:
   ```
   cd SMLLM
   ```
3. Install the dependencies:
   ```
   yarn install
   ```

## Usage

To use the Content Creator, follow these steps:

1. Start the development server:
   ```
   yarn start
   ```
2. Open your web browser and navigate to `http://localhost:5173` (or the port specified by your React setup).
3. Enter a prompt in the text field and click "Generate Post" to create AI-generated content.

## Project Structure

The main components of this project are:

- `ContentCreator.tsx`: The main React component that handles the UI and user interactions.
- `ai_api.ts`: Contains the API call function to communicate with the AI service.

## API Configuration

The project uses an external AI API for content generation. The API endpoint is configured in `ai_api.ts`. Make sure the API endpoint is correct and accessible.

## Customization

You can customize the appearance of the application by modifying the styled components in `ContentCreator.tsx`. The project uses Material-UI, so you can refer to the [Material-UI documentation](https://mui.com/) for more styling options.

## Contributing

Contributions to the Content Creator project are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, please open an issue in the GitHub repository.
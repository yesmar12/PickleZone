# PickleZone

PickleZone is a web application for managing and joining pickleball games. It allows users to:

- Create new pickleball games with specific times, courts, and player limits
- Join existing games
- Leave games they can no longer attend
- View upcoming games in a list

## Technologies Used

- Deno (JavaScript runtime)
- Fresh (web framework)
- Deno KV (database)
- Tailwind CSS (styling)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PickleZone.git
   cd PickleZone
   ```

2. Install Deno (if not already installed):
   ```bash
   brew install deno
   ```

3. Start the development server:
   ```bash
   deno task start
   ```

4. Open the application in your browser:
   ```
   http://localhost:8000
   ```

## Development

- Run the development server:
  ```bash
  deno task start
  ```

- Run tests:
  ```bash
  deno test
  ```

- Format code:
  ```bash
  deno fmt
  ```

- Lint code:
  ```bash
  deno lint
  ```

## Deployment

To deploy to production:

1. Build the application:
   ```bash
   deno task build
   ```

2. Start the production server:
   ```bash
   deno task start
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

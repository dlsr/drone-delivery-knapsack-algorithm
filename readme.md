# Drone Delivery Service

This Drone Delivery Service facilitates the distribution of packages among a fleet of drones for efficient delivery to various locations. It orchestrates the process by optimizing the allocation of packages to drones based on their maximum weight capacities.

## Usage

- Run `npm i` to install the necessary dependencies.

- Run Tests: Execute `npm run test` to run all tests.

- Review Test Inputs and Outputs: Open the `drone-delivery-service.spec` file to examine the inputs and outputs of the tests.

## Key Features

### Drone and Location Management

- The system operates with instances of `Drone` and `Location` entities, each representing a drone and a delivery location, respectively.

### Package Allocation

- The `delivery` method in `DeliveryService` is responsible for allocating packages from a given set of locations to a fleet of drones.

### Grouping Drones

- Drones are grouped based on their maximum weight capacities using the `groupDronesByMaxWeight` method. This ensures efficient allocation by considering the capacity constraints of each drone.

### Knapsack Algorithm

- The system utilizes the knapsack algorithm to optimize the allocation of packages among drones while respecting their weight capacities. This is implemented in the `generateKnapsackTable` and `getLocationsToDelivery` methods.

### Delivery Strategy

- The `delivery` method iteratively selects locations and assigns them to drones based on their capacities until all locations are delivered or no drones are available.

### Optimization

- The system optimizes the allocation process to minimize the number of trips required for delivery while ensuring that each drone operates within its weight capacity limits.

### Big O notation for the DeliveryService
- `groupDronesByMaxWeight`: `O(n)`, where `n` is the number of drones.
- `generateKnapsackTable`: `O(n * m)`, where `n` is the number of locations and `m` is the maximum weight capacity.
- `getLocationsToDelivery`: `O(n * m)`, where `n` is the number of locations and `m` is the maximum weight capacity.
- `delivery`: The time complexity of each iteration inside the loop is dominated by the calls to generateKnapsackTable and `getLocationsToDelivery`, resulting in `O(n * m)`, where `n` is the number of locations and `m` is the maximum weight capacity.
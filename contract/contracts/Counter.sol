// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Counter {
    uint256 public count;

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Counter is already at zero");
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}

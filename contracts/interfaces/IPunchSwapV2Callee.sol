// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IPunchSwapV2Callee {
    function punchSwapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}

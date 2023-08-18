import confetti from "canvas-confetti";

function shootConfetti() {
    const adjust_degree = 5;
    let left_angle = 60;
    let right_angke = 120;

    // 数组代表y轴高度的百分比
    for (const y_loc of [0.25, 0.375, 0.5, 0.625, 0.75]) {
        // 左侧礼炮
        confetti({
            particleCount: 200,
            angle: left_angle,
            spread: 55,
            origin: { x: 0, y: y_loc }
        });

        // 右侧礼炮
        confetti({
            particleCount: 200,
            angle: right_angke,
            spread: 55,
            origin: { x: 1, y: y_loc }
        });

        left_angle -= adjust_degree;
        right_angke += adjust_degree;
    }
}

export default shootConfetti;

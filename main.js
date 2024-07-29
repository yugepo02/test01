document.getElementById('s').addEventListener('change', function() {
    const label = document.getElementById('tex');
    const nub = parseInt(document.getElementById('nub').value);
    if (nub === 6 && this.checked) {
        label.innerHTML = '<input type="checkbox" id="s" checked> <input type="text" id="angle"> 角度';
    } else {
        label.innerHTML = '<input type="checkbox" id="s"> <input type="text" id="tall"> 高さ';
    }
});

// 単位を取得する関数
function getUnit() {
    return document.getElementById('unit').value;
}

// 単位をメートルに変換する関数
function convertToMeters(value, unit) {
    switch (unit) {
        case 'cm':
            return value / 100;
        case 'mm':
            return value / 1000;
        default:
            return value; // m
    }
}

// 面積の単位を計算する関数
function getAreaUnit(unit) {
    switch (unit) {
        case 'cm':
            return 'cm²';
        case 'mm':
            return 'mm²';
        default:
            return 'm²'; // m
    }
}

function calculateArea() {
    const nub = parseInt(document.getElementById('nub').value);
    const x = parseFloat(document.getElementById('x').value) || 0;
    const y = parseFloat(document.getElementById('y').value) || 0;
    const tall = parseFloat(document.getElementById('tall').value) || 0;
    const angle = parseFloat(document.getElementById('angle').value) || 0;
    const s = document.getElementById('s').checked;
    
    const unit = getUnit(); // 単位を取得
    
    const xInMeters = convertToMeters(x, unit);
    const yInMeters = convertToMeters(y, unit);
    const tallInMeters = convertToMeters(tall, unit);
    
    let area = 0;

    switch (nub) {
        case 1: // 正方形
            area = xInMeters * xInMeters;
            break;
        case 2: // 長方形
            area = xInMeters * yInMeters;
            break;
        case 3: // 台形
            area = (xInMeters + yInMeters) * tallInMeters / 2;
            break;
        case 4: // 平行四辺形
            area = xInMeters * tallInMeters;
            break;
        case 5: // ひし形
            area = xInMeters * yInMeters / 2;
            break;
        case 6: // 直角三角形
            if (s) {
                const angleInRadians = angle * (Math.PI / 180); // angleを角度として使用
                area = 0.5 * xInMeters * (xInMeters * Math.tan(angleInRadians));
            } else {
                area = 0.5 * xInMeters * tallInMeters;
            }
            break;
        case 7: // 二等辺三角形
            area = xInMeters * tallInMeters / 2;
            break;
        case 8: // 円形
            area = xInMeters * xInMeters * Math.PI;
            break;
        case 9: // 半円形
            area = xInMeters * xInMeters * Math.PI / 2;
            break;
        case 10: // 三角形
            area = xInMeters * tallInMeters / 2;
            break;
        default:
            area = "無効な図形番号です";
            break;
    }

    /*if (typeof area === 'number') {
        area = area.toFixed(2); // 小数点第2位まで表示
    }*/

    const areaUnit = getAreaUnit(unit); // 面積の単位を取得
    document.getElementById('result').textContent = "面積: " + area + " " + areaUnit;
}

<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -75, 35,
                -125, 35
            ]),
            width: 5,
            clampToGround: true,
            material: Cesium.Color.RED
        }
    });

    viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -75, 35,
                -125, 35
            ]),
            width: 5,
            arcType: Cesium.ArcType.RHUMB,
            material: Cesium.Color.GREEN
        }
    });

    viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -75, 37,
                -125, 37
            ]),
            width: 10,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 2,
                taperPower: .5,
                color: Cesium.Color.CORNFLOWERBLUE
            })
        }
    });

    viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -75, 39, 250000,
                -125, 39, 250000
            ]),
            width: 5,
            material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.ORANGE,
                outlineWidth: 2
            })
        }
    });

    viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -75, 43, 500000,
                -125, 43, 500000
            ]),
            width: 10,
            arcType: Cesium.ArcType.NONE,
            material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE)
        }
    });

    viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -75, 45, 500000,
                -125, 45, 500000
            ]),
            width: 4,
            material: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.CYAN
            })
        }
    });

    viewer.zoomTo(viewer.entities);
};

onMounted(() => {
    createCesium();
});
</script>

<template>
<div id="cesium-container" class="fullscreen"></div>
</template>

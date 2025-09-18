import * as Cesium from 'cesium';


class ImageryProvider {
    constructor(option) {

        const southwestInMeters = new Cesium.Cartesian2(-33554054, -33746824);
        const northeastInMeters = new Cesium.Cartesian2(33554054, 33746824);

        this._tilingScheme = new Cesium.WebMercatorTilingScheme({
            rectangleSouthwestInMeters: southwestInMeters,
            rectangleNortheastInMeters: northeastInMeters
        });

        this._rectangle = this._tilingScheme.rectangle;

        this._resource = Cesium.Resource.createIfNeeded(option.url);

        if (option.minimumLevel) {
            this._minimumLevel = option.minimumLevel;
        }
        if (option.maximumLevel) {
            this._maximumLevel = option.maximumLevel;
        }

        this._udt = option.udt;

        this._credit = option.credit;

        let subdomains = option.subdomains;

        if (Array.isArray(subdomains)) {
            subdomains = subdomains.slice();
        } else if (Cesium.defined(subdomains) && subdomains.length > 0) {
            subdomains = subdomains.split('');
        } else {
            subdomains = [ 'a', 'b', 'c' ];
        }

        this._subdomains = subdomains;
    }


    _hasAlphaChannel = true;

    get hasAlphaChannel() {
        return this._hasAlphaChannel;
    }

    get udt() {
        return this._udt;
    }

    get subdomains() {
        return this._subdomains;
    }

    _errorEvent = new Cesium.Event();

    get errorEvent() {
        return this._errorEvent;
    }

    _minimumLevel = 1;

    get minimumLevel() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要调用minimumLevel。');
        }
        return this._minimumLevel;
    }

    _maximumLevel = 19;

    get maximumLevel() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要调用maximumLevel。');
        }
        return this._maximumLevel;
    }

    _tileWidth = 256;

    get tileWidth() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要调用tileWidth。');
        }
        return this._tileWidth;
    }

    _tileHeight = 256;

    get tileHeight() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要调用tileHeight。');
        }
        return this._tileHeight;
    }

    _tileDiscardPolicy = undefined;

    get tileDiscardPolicy() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要tileDiscardPolicy。');
        }
        return this._tileDiscardPolicy;
    }

    _credit = undefined;

    get credit() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要credit。');
        }
        return this._credit;
    }

    _readyPromise = undefined;

    get readyPromise() {
        return this._readyPromise;
    }

    get ready() {
        return this._resource;
    }

    get url() {
        return this._resource.url;
    }

    get proxy() {
        return this._resource.proxy;
    }

    get tilingScheme() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要tilingScheme。');
        }
        return this._tilingScheme;
    }

    get rectangle() {
        if (!this.ready) {
            throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不要rectangle。');
        }
        return this._rectangle;
    }
}


/*  百度影像
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
export class BaiduMapImageryProvider extends ImageryProvider {

    constructor(option) {

        super(option);

        if (option.type) {
            this._type = option.type;
        }

        if (option.annotation) {
            this._annotation = option.annotation;
        }

        if (option.type === 'vector' && !option.maximumLevel) {
            this._maximumLevel = 20;
        }
    }

    _type = 'imagery';

    get type() {
        return this._type;
    }

    _annotation = false;

    get annotation() {
        return this._annotation;
    }

    requestImage(x, y, level) {
        level   = Math.min(level, this.maximumLevel);
        const d = this.subdomains;
        const i = (x + y + level) % d.length;
        const r = this.tilingScheme.getNumberOfXTilesAtLevel(level);
        const c = this.tilingScheme.getNumberOfYTilesAtLevel(level);
        let t   = this.udt;
        let u   = this.url;

        x = x - r / 2;
        y = c / 2 - y - 1;

        // 解决百度影像地图，只有中国部分的问题
        if (x < 0) {
            x = `M${ -x }`;
        }
        if (y < 0) {
            y = `M${ -y }`;
        }

        let params;

        switch (this.type) {
            case 'vector': {
                u += '/tile/';

                params = {
                    x,
                    y,
                    z: level,
                    qt: 'vtile',
                    v: '083'
                };

                params[ 'showtext' ] = this.annotation ? '1' : '0';

                break;
            }
            case 'road': {
                u += '/tile/';

                params = {
                    x,
                    y,
                    z: level,
                    qt: 'vtile',
                    v: '083',
                    styles: 'sl'
                };
                //https://maponline2.bdimg.com/tile/?qt=vtile&x=3405&y=1321&z=14&styles=sl&showtext=0&v=083&udt=20231115

                params[ 'showtext' ] = this.annotation ? '1' : '0';

                break;
            }
            default: {
                u += '/starpic/';
                params = {
                    u: `x=${ x };y=${ y };z=${ level };v=009;type=sate`,
                    qt: 'satepc',
                    fm: '46',
                    app: 'webearth2',
                    v: '009'
                };
            }
        }

        if (t) {
            params[ 'udt' ] = t;
        }

        u = u.replace('//', '/').replace('{s}', d[ i ]);

        const resource = Cesium.Resource.createIfNeeded(u);

        resource[ 'setQueryParameters' ](params, true);

        return resource[ 'fetchImage' ]({
            preferImageBitmap: true,
            flipY: true
        });
    }
}

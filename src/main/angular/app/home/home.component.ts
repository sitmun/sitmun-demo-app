import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Principal,LoginService,MapConfigurationManagerService, Layer, LayerGroup, MapOptionsConfiguration,
        OptionalParameter, MapComponentStatus} from '@sitmun/frontend-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isHome = true;     
  constructor(public loginService:LoginService,public principal:Principal,
              private mapConfigurationManagerService: MapConfigurationManagerService,
              private translationService: TranslateService) { }

  // Defines if the component is listening to any map configuration changes             
  subscribedToConfigManagerService = false;
  ngOnInit() {
    //Set the language in case it has not been selected yet
    if ((this.translationService.currentLang == null) || (this.translationService.currentLang == undefined)) {
      this.translationService.use(this.translationService.defaultLang);
    }
    //Wait for the map component status to be loaded (the map component is fully initialized and ready to be configured)
    var mapStatusListener = this.mapConfigurationManagerService.getMapComponentStatusListener().subscribe(
      (status:MapComponentStatus[]) => {
        if ((status != null) && (status.length > 0)) {
          if (status[0].loaded) {
            if (mapStatusListener) {
              // Unsubscribe from the map status service as it is already loaded
              mapStatusListener.unsubscribe();
            }
            if (!this.subscribedToConfigManagerService) {
              this.subscribedToConfigManagerService = true;
              this.configureMap();
            }
          }
        }
      },
      (error:any) => {
        console.log("Error getting MapComponent status");
      }
    ); 
  }
    
  logout(){
    this.loginService.logout();
  }
    
  isLoggedIn(){
    return this.principal.isAuthenticated();
  }

  configureMap() {

    // Set map configuration
    let mapOptionsConfiguration = new MapOptionsConfiguration();
    mapOptionsConfiguration.scales = 
    [1000000, 700000, ​500000, 400000, 300000, 200000, 100000, 50000, 25000, 20000, 10000, 5001, 2500, 1000, 500].join();
    mapOptionsConfiguration.projections = ["EPSG:25831"].join();
    mapOptionsConfiguration.minScale = 3000;
    mapOptionsConfiguration.maxScale = 3000000;
    //Overrides the directive parameter
    mapOptionsConfiguration.extent = [
      256901.08041000657, //xMin
      4544669.980255321, //yMin
      554715.9195899934, //xMax
      4703023.019744679 //yMax
    ];
    mapOptionsConfiguration.maxExtent = [
      320000, //xMin
      4561229,//yMin
      491617, //xMax
      4686464 //yMax
    ];
    mapOptionsConfiguration.tileWidth = 500;
    mapOptionsConfiguration.tileHeight = 500;
    this.mapConfigurationManagerService.loadMapOptionsConfiguration(mapOptionsConfiguration);

    // Set the Base Layer Configuration, an array of layer groups as defined below that can be shown
    // or hidden if selected with the base layer selector tool.
    // If two or more base layer groups are defined the a baselayer selector tool will be shown on the map viewer.
    // The first group defined will be the one being displayed at first after this configuration process.
    let baseLayersConfiguration = new Array<LayerGroup>();

    var layerGroup = new LayerGroup();
    layerGroup.id = "map";
    layerGroup.name = "MAP"; //Name to be shown in the base layer selector tool
    layerGroup.layers = [];

    //Each layer will be a request to a map service
    var layer = new Layer();
    layer["visibility"] = false;
    // Sets if this layer's service could be requested for additional information of a selected location on the map
    layer["queryable"] = false;
    // Opacity for this layer image in the map
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    // WMS request transparent parameter
    layer["url_transparent"] = "TRUE";
    // WMS request background color parameter
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Mapa - imgmapa";
    layer["serverName"] = "1"; 
    // Layer identifier to be used in layer indexation and retrieval
    layer["id"] = "1"; 
    // WMS request image format parameter
    layer["format"] = "png"; 
    // WMS request service version parameter
    layer["version"] = "1.1.1"; 
    // Service request url
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    // Service layers to be requested
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC,M_EIX,M_EIX_sobre_EDIF,M_XCE50_AUTO,M_XCE50_BASICA,M_XCE50_LOCAL,M_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f,M_MUNIS_f,M_MUNIS";
    // Sets if this layer will be represented by an only image covering the whole map area or by tile set
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya"; 
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Mapa - imgmapa_et"; 
    layer["serverName"] = "2"; 
    layer["id"] = "2"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.1"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS"; 
    layer["tiled"] = false;
    layerGroup.layers.push(layer);
    
    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Mapa - imgeix"; 
    layer["serverName"] = "3"; 
    layer["id"] = "3"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.1"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET"; 
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayersConfiguration.push(layerGroup);
    
    layerGroup = new LayerGroup();
    layerGroup.id = "hybrid";
    layerGroup.name = "HYBRID";
    layerGroup.layers = [];

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000"; 
    //For tiled services the extent of the available data must be defined in order to calculate corretly its tile set
    layer["extent"] = [254904.96, 4484796.89, 530907.3, 4749795.1];
    layer["title"] = "Base Aerial - ICC2"; 
    layer["serverName"] = "4"; 
    layer["id"] = "4"; 
    layer["format"] = "image/png"; 
    layer["version"] = "1.1.1"; 
    layer["url"] = "http://mapcache.icc.cat/map/bases/service"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "orto"; 
    layer["tiled"] = true;
    layer["tileHeight"] = 256; 
    layer["tileWidth"] = 256;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 0.7;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0xFEFEFE";
    layer["title"] = "Base Hybrid - imghibrid_fons"; 
    layer["serverName"] = "5"; 
    layer["id"] = "5"; 
    layer["format"] = "image/png"; 
    layer["version"] = "1.1.1"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_EDIF_1M_611A,M_EIX,M_EIX_sobre_EDIF";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 0.85;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Hybrid - imghibrid_ctra"; 
    layer["serverName"] = "6"; 
    layer["id"] = "6"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.1"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false
    layer["name"] = "IH_XCE50_AUTO,IH_XCE50_BASICA,IH_XCE50_LOCAL,IH_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Hybrid - imghibrid_et"; 
    layer["serverName"] = "7"; 
    layer["id"] = "7"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.1"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS"; 
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayersConfiguration.push(layerGroup);
    
    this.mapConfigurationManagerService.loadBaseLayersConfiguration(baseLayersConfiguration);

    // Set the Overlay Layer list configuration, unless set otherwise these layers will be shown no matter which baselayer group is being displayed
    let overlayLayersConfiguration = new Array<Layer>();

    layer = new Layer();
    layer["visibility"] = true;
    layer["queryable"] = true; //Should a layer have this attribue set to true a Get Feature Information tool will be shown on the map to
                               // retrieve the available information of a point clicked on the map
    layer["opacity"] = 0.2;
    layer["attributions"] = "© IGME (Instituto Geologico y Minero de España)";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Geology"; 
    layer["serverName"] = "8"; 
    layer["id"] = "8"; 
    layer["format"] = "png"; 
    layer["version"] = "1.3.0"; 
    layer["url"] = "http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "0"; 
    layer["tiled"] = false;

    overlayLayersConfiguration.push(layer);

    layer = new Layer();
    layer["visibility"] = true;
    layer["queryable"] = true;
    layer["opacity"] = 1.0;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Transport"; 
    layer["serverName"] = "9"; 
    layer["id"] = "9"; 
    layer["format"] = "png"; 
    layer["version"] = "1.3.0"; 
    layer["url"] = "http://servicios.idee.es/wms-inspire/transportes"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "TN.RailTransportNetwork.RailwayLink"; 
    layer["tiled"] = false;

    overlayLayersConfiguration.push(layer);

    this.mapConfigurationManagerService.loadLayersConfiguration(overlayLayersConfiguration);

    // Set Overview Map (Situation map tool), if left undefined the currently displayed baselayer group configuration will be displayed in
    // the situation map tool
    let situationMapConfiguration = new Array<Layer>();

    layer = new Layer();
    layer["visibility"] = true;
    layer["queryable"] = false;
    layer["opacity"] = 1.0;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Mapa - imgeix"; 
    layer["serverName"] = "10"; 
    layer["id"] = "10"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.0"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET"; 
    layer["tiled"] = false;
    
    situationMapConfiguration.push(layer);

    layer = new Layer();
    layer["visibility"] = true;
    layer["queryable"] = false;
    layer["opacity"] = 1.0;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya"; 
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Mapa - imgmapa"; 
    layer["serverName"] = "10"; 
    layer["id"] = "10"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.0"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC"; 
    layer["tiled"] = false;
    
    situationMapConfiguration.push(layer);

    layer = new Layer();
    layer["visibility"] = true;
    layer["queryable"] = false;
    layer["opacity"] = 1.0;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["url_transparent"] = "TRUE"; 
    layer["url_bgcolor"] = "0x000000";
    layer["title"] = "Base Mapa - imgmapa_et"; 
    layer["serverName"] = "10"; 
    layer["id"] = "10"; 
    layer["format"] = "png"; 
    layer["version"] = "1.1.0"; 
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer"; 
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS"; 
    layer["tiled"] = false;
    
    situationMapConfiguration.push(layer);

    this.mapConfigurationManagerService.loadSituationMapConfiguration(situationMapConfiguration);
  }

}

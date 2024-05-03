<template>
  <div id="container1">
    <div id="map" @click="handleMapClick">
    </div>
    <div id="location-button">
      <input v-model="newLon" type="text" placeholder="Enter Longitude">
      <input v-model="newLat" type="text" placeholder="Enter Latitude">
      <button @click="addMarker">Add Marker</button>
      <button @click="deleteMarker">Delete Marker</button>
      <button @click="getCurrentLocation">Get Current Location</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markers: [], // เพิ่ม markers เป็น array เพื่อเก็บ marker ทั้งหมด
      newLon: 0,
      newLat: 0,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://api.longdo.com/map/?key=42d63fb3325dc8cf3207245f038ff561';

      script.onload = () => {
        this.createMap();
      };

      document.head.appendChild(script);
    },
    createMap() {
      window.longdo = window.longdo || {};
      this.map = new window.longdo.Map({
        placeholder: document.getElementById('map')
      });
    },
    addMarker() {
      if (this.map) {
        // ลบ marker เก่าทั้งหมด
        this.markers.forEach((marker) => {
          this.map.Overlays.remove(marker);
        });

        const { newLon, newLat } = this;
        const marker = new window.longdo.Marker({ lon: newLon, lat: newLat });
        this.map.Overlays.add(marker);

        // เก็บ marker ล่าสุดไว้ใน array
        this.markers = [marker];
      }
    },
    deleteMarker() {
      if (this.map && this.markers.length > 0) {
        // ลบ marker ทั้งหมดใน array
        this.markers.forEach((marker) => {
          this.map.Overlays.remove(marker);
        });
        // ลบทั้งหมดออกจาก array
        this.markers = [];
      }
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.newLon = position.coords.longitude;
          this.newLat = position.coords.latitude;
          this.addMarker();
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
    handleMapClick(event) {
      if (this.map) {
        // ลบ marker เก่าทั้งหมด
        this.markers.forEach((marker) => {
          this.map.Overlays.remove(marker);
        });

        const position = this.map.location(event.lng, event.lat);
        this.newLon = position.lon;
        this.newLat = position.lat;

        const marker = new window.longdo.Marker({ lon: this.newLon, lat: this.newLat });
        this.map.Overlays.add(marker);

        // เก็บ marker ล่าสุดไว้ใน array
        this.markers = [marker];
      }
    }
  }
};
</script>

<style >
#container1 {

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: flex-start; */
  margin-bottom: 30px;
  margin-top:30px ;
  width: 1200px;
  /* background-color: #ff6565; */
}

#location-button {
  display: flex;
  gap: 10px;
}

#location-button input {
  margin-top: 8px;
  height: 25px;
  width: 150px;
}

#location-button button {
  margin-top: 8px;
  padding: 5px 10px 5px 10px;
}

#location-button button:nth-child(3) {
  background-color: rgb(82, 161, 235);
}

#location-button button:nth-child(4) {
  background-color: #ff6565;
}

#location-button button:nth-child(5) {
  background-color: rgb(100, 243, 119);
}

#map {
  height: 200px;
  width: 705px;
  cursor: crosshair;
}
</style>
